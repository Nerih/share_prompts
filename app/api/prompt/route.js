import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request) => {
	try {
		console.log("API Fetching Prompts");
		await connectToDatabase();
		const prompts = await Prompt.find().populate("creator");
		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.log("ERROR");
		console.log(error);

        return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
