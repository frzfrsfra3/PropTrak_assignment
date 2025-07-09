import RealEstate from "../models/RealEstate.js";
import { NotFoundError } from "../request-errors/index.js";
import TenantUser from "../models/TenantUser.js";
import mongoose from "mongoose";

/**
 * @description Get all properties
 * @returns {object} realEstate array
 */
 const getAllProperties = async (req, res) => {
  try {
    const { search, category, priceFilter, type } = req.query;

    // 1. بناء كائن الفلترة الأساسي مع طبقات حماية متعددة
    const queryObject = {
      status: true,
      archived: false,
      propertyOwner: { 
        $exists: true,
        $ne: null,
        $type: 'objectId' // تأكيد أن القيمة هي ObjectId صالح
      }
    };

    // 2. معالجة البحث مع تحسين الأداء
    if (search) {
      const searchParts = search.split(' ').filter(Boolean);
      const searchConditions = [];
      const numberPattern = /^\d+$/;
      const amenitiesKeywords = new Set(['wifi', 'parking', 'ac', 'pool', 'garden']);

      searchParts.forEach(part => {
        const lowerPart = part.toLowerCase();
        
        // فلترة عددية ذكية
        if (numberPattern.test(part)) {
          const num = parseInt(part);
          searchConditions.push({ bedrooms: num });
          searchConditions.push({ bathrooms: num });
        }
        
        // فلترة المرافق باستخدام Set لأداء أفضل
        if (amenitiesKeywords.has(lowerPart)) {
          searchConditions.push({ 
            amenities: { 
              $elemMatch: { $regex: new RegExp(`^${lowerPart}$`, 'i') } 
            } 
          });
        }
        
        // البحث في الحقول النصية مع فهارس نصية
        ['title', 'description', 'address.streetName', 
         'address.city', 'address.state', 'address.country'].forEach(field => {
          searchConditions.push({ 
            [field]: { $regex: part, $options: "i" } 
          });
        });
      });

      queryObject.$and = [
        { $or: searchConditions },
        { propertyOwner: queryObject.propertyOwner } // الحفاظ على شرط المالك
      ];
    }

    // 3. تطبيق الفلاتر الإضافية مع تحقق من الصحة
    if (category && category !== "all") {
      queryObject.category = { 
        $in: ['House', 'Apartment', 'Room', 'Shop Space', 'Office Space']
          .filter(c => c === category) 
      };
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        queryObject.price = { $gte: minPrice, $lte: maxPrice };
      }
    }

    if (type) {
      queryObject.type = { $in: ['Rent', 'Sale'].filter(t => t === type) };
    }

    // 4. التنفيذ مع طبقات حماية إضافية
    let query = RealEstate.find(queryObject)
      .populate({
        path: "propertyOwner",
        match: { _id: { $exists: true } },
        select: "-password -createdAt -updatedAt -__v -contacts",
        options: { lean: true }
      })
      .lean()
      .sort({ createdAt: -1 });

    // 5. التقسيم إلى صفحات مع تحكم آمن
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 5));
    const skip = (page - 1) * limit;

    // 6. التنفيذ المتوازي لتحسين الأداء
    const [results, total] = await Promise.all([
      query.skip(skip).limit(limit),
      RealEstate.countDocuments(queryObject)
    ]);

    // 7. الفلترة النهائية للتأكد من النتائج
    const filteredResults = results.filter(property => 
      property?.propertyOwner?._id &&
      mongoose.Types.ObjectId.isValid(property.propertyOwner._id)
    );

    res.json({
      allRealEstate: filteredResults,
      numberOfPages: Math.ceil(total / limit) || 1,
      totalRealEstates: total
    });

  } catch (error) {
    console.error('Error in getAllProperties:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @description Get single property
 * @returns {object} realEstate
 */
const getSingleProperty = async (req, res) => {
  const { slug } = req.params;
  const { userId } = req.user;

  const realEstate = await RealEstate.findOne({ slug }).populate({
    path: "propertyOwner",
    select: "-password -createdAt -updatedAt -__v -contacts",
  });

  if (!realEstate) {
    throw new NotFoundError(`Property was not found`);
  }

  const { _id: id } = realEstate;

  //check if property is saved by user
  const currentTenantUser = await TenantUser.findById(userId);
  const isSaved = currentTenantUser.savedProperties.includes(id.toString());

  res.json({ realEstate, isSaved });
};

/**
 * @description Save property if not saved otherwise remove from saved list
 * @returns {object} TenantUser
 */
const savePropertyToggle = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const toSaveProperty = await RealEstate.findById(id);

  if (!toSaveProperty) {
    throw new NotFoundError(`Property with id: ${id} not found`);
  }
  const currentTenantUser = await TenantUser.findById(userId);

  //check if property is already saved by user and remove it from saved properties
  if (currentTenantUser.savedProperties.includes(id)) {
    currentTenantUser.savedProperties =
      currentTenantUser.savedProperties.filter(
        (propertyId) => propertyId.toString() !== id
      );
    const updatedUser = await TenantUser.findOneAndUpdate(
      { _id: userId },
      {
        savedProperties: currentTenantUser.savedProperties,
      },
      { new: true, runValidators: true }
    );

    res.json({
      updatedUser,
      message: "Property removed from saved properties",
      isSaved: false,
    });
  } else {
    //add property to saved properties
    const updatedUser = await TenantUser.findOneAndUpdate(
      { _id: userId },
      {
        $push: { savedProperties: id },
      },
      { new: true, runValidators: true }
    );

    res.json({
      updatedUser,
      message: "Property saved successfully",
      isSaved: true,
    });
  }
};

/**
 * @description Get all properties
 * @returns {object} realEstate array
 */
const getAllSavedProperties = async (req, res) => {
  const { userId } = req.user;

  const currentTenantUser = await TenantUser.findById(userId).populate({
    path: "savedProperties",
    select: "-createdAt -updatedAt -__v",

    populate: {
      path: "propertyOwner",
      model: "OwnerUser",
      select: "-createdAt -updatedAt -__v -contacts",
    },
  });

  if (!currentTenantUser) {
    throw new NotFoundError(`User with id: ${userId} not found`);
  }

  // reverse the saved properties array to show the latest saved property first
  currentTenantUser.savedProperties.reverse();

  res.json({ savedProperties: currentTenantUser.savedProperties });
};

export {
  getAllProperties,
  getSingleProperty,
  savePropertyToggle,
  getAllSavedProperties,
};
