import { UserRoleType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

function checkUser(req: Request, res: Response, next: NextFunction) {
	// const nonSecurePaths = ['/',];
	// if (nonSecurePaths.includes(req.path)) {
	// 	return next();
	// }

	if (req.type === UserRoleType.BUYER) {
		return res.status(401).json({
			statusCode: 401,
			cause: 'user',
			errorMsg: "user doe's not permission",
		});
	}

	next();
}

export { checkUser };
