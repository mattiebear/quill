import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { FC } from 'react';

export const withAuthRequired = <T extends object>(Component: FC<T>) => {
	return (props: T) => {
		return (
			<>
				<SignedOut>
					<RedirectToSignIn />
				</SignedOut>
				<SignedIn>
					<Component {...props} />
				</SignedIn>
			</>
		);
	};
};
