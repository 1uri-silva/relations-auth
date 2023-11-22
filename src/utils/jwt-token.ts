import { NextFunction, Request, Response } from 'express';
import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

type JwtPayloadToken = JwtPayload & {
	type: string;
};

const SECRET_KEY = 'secret';

function generateToken(payload: JwtPayload, options: SignOptions) {
	return sign(payload, SECRET_KEY, options);
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
	try {
		const bearerToken = req.headers.authorization;

		if (!bearerToken) {
			return res.status(401).json({
				statusCode: 401,
				cause: 'token',
				errorMsg: 'Token is not provider',
			});
		}

		const token = bearerToken.replace('Bearer ', '');

		const { type, sub } = verify(token, SECRET_KEY) as JwtPayloadToken;

		req.id = sub!;
		req.type = type;

		next();
	} catch (error) {
		res.status(401).json({
			statusCode: 401,
			cause: 'token',
			errorMsg: 'Verify token error.',
		});
	}
}

export { generateToken, verifyToken };
