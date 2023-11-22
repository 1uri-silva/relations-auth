import { app } from './server/app';

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`is running on port:${PORT}`);
});
