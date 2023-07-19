import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req, res) => {
    const {userID, prompt, tag} = await req.json();
    
    try{
        await connectToDatabase();
        console.log("UserID:");
        console.log(userID);

        const newPrompt = new Prompt ({
            creator: userID,
            prompt: prompt,
            tag: tag,
        })

        await newPrompt.save();
        
        console.log('API Saved to DB');
        return new Response(JSON.stringify(newPrompt), {status:201})

    } catch(error)
    {
        console.log('EROR');
        console.log(error);
        return new Response("Failed to create a new prompt", {status: 500})
    }

}