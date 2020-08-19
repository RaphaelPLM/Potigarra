require('dotenv').config({ path: '.env' });

console.log('TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE\n\n\n\n\nTESTEEEEEEEE', process.env.DEVELOPMENT_DATABASE_NAME)

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: process.env.DEVELOPMENT_DATABASE_NAME,
			user: process.env.DEVELOPMENT_DATABASE_USER,
			password: process.env.DEVELOPMENT_DATABASE_PASSWORD
		},
		migrations: {
			directory: './src/database/migrations'
		},
		useNullAsDefault: true
	},
	production: {
		client: 'postgresql',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './src/database/migrations'
		}
	}
};
