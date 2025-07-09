import Viewing from '../models/Viewing.js';
import RealEstate from '../models/RealEstate.js';

// إنشاء موعد زيارة جديد
export const createViewing = async (req, res) => {
  try {
    const { propertyId, scheduledTime, notes } = req.body;
    const tenantId = req.user.userId; // ✅ من التوكن

    const property = await RealEstate.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newViewing = await Viewing.create({
      property: propertyId,
      tenant: tenantId,
      owner: property.propertyOwner,
      scheduledTime,
      notes,
      status: 'scheduled',
    });

    res.status(201).json({ viewing: newViewing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// الحصول على مواعيد الزيارة للمستأجر
export const getTenantViewings = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ من التوكن

    const viewings = await Viewing.find({ tenant: userId })
      .populate('property', 'title address price')
      .populate('owner', 'firstName lastName email phoneNumber')
      .populate('tenant')
      .sort({ scheduledTime: 1 });

    res.json({ viewings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// الحصول على مواعيد الزيارة للمالك
export const getOwnerViewings = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ من التوكن

    const viewings = await Viewing.find({ owner: userId })
      .populate('property', 'title address price')
      .populate('tenant', 'firstName lastName email phoneNumber')
      .populate('owner', 'firstName lastName email phoneNumber')
      .sort({ scheduledTime: 1 });

    res.json({ viewings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تحديث حالة الموعد
// export const updateViewingStatus = async (req, res) => {
//   try {
//     const { status, feedback } = req.body;
//     const viewing = await Viewing.findByIdAndUpdate(
//       req.params.id,
//       { status, feedback },
//       { new: true }
//     );

//     res.json({ viewing });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// تحديث حالة الموعد
export const updateViewingStatus = async (req, res) => {
    try {
      const { status, feedback } = req.body;
      const viewing = await Viewing.findByIdAndUpdate(
        req.params.id,
        { status, feedback },
        { new: true }
      )
      .populate('property', 'title address price')
      .populate('owner', 'firstName lastName email phoneNumber');
  
      if (!viewing) {
        return res.status(404).json({ message: 'Viewing not found' });
      }
  
      res.json({ viewing });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };