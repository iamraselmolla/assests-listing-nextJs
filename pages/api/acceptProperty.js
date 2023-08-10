import { isAdmin } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function approvePropery(req, res){
    switch(req.method){
        case "PUT" : 
        {
            try{
                isAdmin(req, res, async(req, res, next, decoded)=> {
                    await dbConnect();
                    const {id} = req.body
                    const result = await Property.findByIdAndUpdate(id, {
                        'activity.accepted' : true
                    })
                    res.status(200).json({message: 'Property Accepted'});
                })
            }catch (err) {
        return res.status(500).json({ message: "Server error" });
      }
        }
    }
}