"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const myProfile = () => {
	const router = useRouter(); //setup router
	const { data: session } = useSession(); //setup session

	const [myPosts, setMyPosts] = useState([]); //setup posts

	const handleEdit = () => {};
	const handleDelete = async () => {};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();
			console.log("Fetching Posts");
			console.log(data);
			setMyPosts(data);
		};
		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page!"
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default myProfile;
