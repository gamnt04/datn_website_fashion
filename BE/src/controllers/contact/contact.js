import contact from "../../models/contact/contact";

export const create_contact = async (req, res) => {
  try {
    const data = await contact(req.body).save();
    if (!data) {
      throw new Error(`Error creating`);
    }
    return res.status(200).json({
      message: "Bạn đã tạo thành công",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
}
export const get_contact = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        let objWhere = {};
        if (keyword) {
        objWhere.name = new RegExp(keyword, "i");
        }
    
        const data = await contact.find(objWhere);
        if (!data) {
        throw new Error(`Failed to get contacts`);
        }
        return res.status(200).json({
        message: "Thành công",
        data,
        });
    } catch (error) {
        return res.status(400).json({
        name: error.name,
        message: error.message,
        });
    }
    }
    export const getById_contact = async (req, res) => {
    try {
        const data = await contact.findById(req.params.id);
        if (!data) {
        throw new Error(`Failed to get contact detail`);
        }
        return res.status(200).json({
        message: "Thành công",
        data,
        });
    } catch (error) {
        return res.json({
        name: error.name,
        message: error.message,
        });
    }
    }
    export const delete_contact = async (req, res) => {
    try {
        const data = await contact.findByIdAndDelete(req.params.id);
        if (!data) {
        throw new Error(`Failed to delete contact`);
        }
        return res.status(200).json({
        message: "Xóa thành công",
        data,
        });
    } catch (error) {
        return res.json({
        name: error.name,
        message: error.message,
        });
    }
    }














    // import contact from "../../models/contact/contact";

    // export const create_contact = async (req, res) => {
    //   try {
    //     const data = await contact(req.body).save();
    //     if (!data) {
    //       throw new Error(`Error creating`);
    //     }
    //     return res.status(200).json({
    //       message: "Bạn đã tạo thành công",
    //       data,
    //     });
    //   } catch (error) {
    //     return res.json({
    //       name: error.name,
    //       message: error.message,
    //     });
    //   }
    // }
    // export const get_contact = async (req, res) => {
    //     try {
    //         const keyword = req.query.keyword;
    //         let objWhere = {};
    //         if (keyword) {
    //         objWhere.name = new RegExp(keyword, "i");
    //         }
        
    //         const data = await contact.find(objWhere);
    //         if (!data) {
    //         throw new Error(`Failed to get contacts`);
    //         }
    //         return res.status(200).json({
    //         message: "Thành công",
    //         data,
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //         name: error.name,
    //         message: error.message,
    //         });
    //     }
    //     }
    //     export const getById_contact = async (req, res) => {
    //     try {
    //         const data = await contact.findById(req.params.id);
    //         if (!data) {
    //         throw new Error(`Failed to get contact detail`);
    //         }
    //         return res.status(200).json({
    //         message: "Thành công",
    //         data,
    //         });
    //     } catch (error) {
    //         return res.json({
    //         name: error.name,
    //         message: error.message,
    //         });
    //     }
    //     }
    //     export const delete_contact = async (req, res) => {
    //     try {
    //         const data = await contact.findByIdAndDelete(req.params.id);
    //         if (!data) {
    //         throw new Error(`Failed to delete contact`);
    //         }
    //         return res.status(200).json({
    //         message: "Xóa thành công",
    //         data,
    //         });
    //     } catch (error) {
    //         return res.json({
    //         name: error.name,
    //         message: error.message,
    //         });
    //     }
    //     }
        
        
//     import contact from "../../models/contact/contact";

// export const create_contact = async (req, res) => {
//   try {
//     const data = await contact(req.body).save();
//     if (!data) {
//       throw new Error(`Error creating`);
//     }
//     return res.status(200).json({
//       message: "Bạn đã tạo thành công",
//       data,
//     });
//   } catch (error) {
//     return res.json({
//       name: error.name,
//       message: error.message,
//     });
//   }
// }
// export const get_contact = async (req, res) => {
//     try {
//         const keyword = req.query.keyword;
//         let objWhere = {};
//         if (keyword) {
//         objWhere.name = new RegExp(keyword, "i");
//         }
    
//         const data = await contact.find(objWhere);
//         if (!data) {
//         throw new Error(`Failed to get contacts`);
//         }
//         return res.status(200).json({
//         message: "Thành công",
//         data,
//         });
//     } catch (error) {
//         return res.status(400).json({
//         name: error.name,
//         message: error.message,
//         });
//     }
//     }
//     export const getById_contact = async (req, res) => {
//     try {
//         const data = await contact.findById(req.params.id);
//         if (!data) {
//         throw new Error(`Failed to get contact detail`);
//         }
//         return res.status(200).json({
//         message: "Thành công",
//         data,
//         });
//     } catch (error) {
//         return res.json({
//         name: error.name,
//         message: error.message,
//         });
//     }
//     }
//     export const delete_contact = async (req, res) => {
//     try {
//         const data = await contact.findByIdAndDelete(req.params.id);
//         if (!data) {
//         throw new Error(`Failed to delete contact`);
//         }
//         return res.status(200).json({
//         message: "Xóa thành công",
//         data,
//         });
//     } catch (error) {
//         return res.json({
//         name: error.name,
//         message: error.message,
//         });
//     }
//     }
    
    