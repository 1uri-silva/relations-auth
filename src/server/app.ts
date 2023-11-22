import express from 'express';

import { UserRoleType } from '@prisma/client';
import { connect } from '../database/prisma';
import { generateToken, verifyToken } from '../utils/jwt-token';
import { checkUser } from '../utils/middleware';

const app = express();
app.use(express.json());

app.use(['/new/produtos'], [verifyToken, checkUser]);

app.post('/new/user', async (req, res) => {
	const { username, password, type } = req.body;

	const user = await connect.user.create({
		data: {
			password,
			username,
			type,
		},
	});

	return res.json({ user });
});

app.post('/vendor/user/auth', async (req, res) => {
	const { username, password } = req.body;

	const user = await connect.user.findFirst({
		where: { username },
	});

	if (!user) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "User doe's not exists!" });
	}

	if (password !== user.password) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "user or password doe's not match!" });
	}

	if (user.type === UserRoleType.BUYER) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "user or password doe's not match!" });
	}

	const token = generateToken({ type: user.type }, { subject: user.id });

	return res.json({ user, token });
});

app.post('/buyer/user/auth', async (req, res) => {
	const { username, password } = req.body;

	const user = await connect.user.findFirst({
		where: { username },
	});

	if (!user) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "User doe's not exists!" });
	}

	if (password !== user.password) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "user or password doe's not match!" });
	}

	if (user.type !== UserRoleType.BUYER) {
		return res
			.status(400)
			.json({ statusCode: 400, errorMsg: "user or password doe's not match!" });
	}

	const token = generateToken({ type: user.type }, { subject: user.id });

	return res.json({ user, token });
});

app.post('/new/produtos', async (req, res) => {
	const { productName, price } = req.body;

	const product = await connect.product.create({
		data: {
			price,
			productName,
			userId: req.id,
		},
	});
	return res.json({ product });
});

export { app };
