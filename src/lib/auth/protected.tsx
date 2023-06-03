import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { FC, PropsWithChildren } from 'react';

type ProtectedProps = PropsWithChildren;

export const Protected: FC<ProtectedProps> = ({ children }) => {
	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>{children}</SignedIn>
		</>
	);
};
