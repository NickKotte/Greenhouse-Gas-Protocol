import { useStore } from "@nanostores/react";
import { User } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $currUser, $loading } from '../stores/user';
import { Center, Loader } from '@mantine/core';

interface ProtectedPathProps extends PropsWithChildren {
	redirectUrl: string;
	shouldRedirect?: (arg0: User | null) => boolean;
}

export const ProtectedPath = ({
	children,
	redirectUrl,
	shouldRedirect,
}: ProtectedPathProps) => {
	const user = useStore($currUser);
	const loading = useStore($loading);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !user) {
			navigate(redirectUrl);
		}
	}, [user, shouldRedirect, navigate, redirectUrl, loading]);

	return (
		<>
			{!loading ? (
				children
			) : (
				<Center>
					<Loader />
				</Center>
			)}
		</>
	);
};
