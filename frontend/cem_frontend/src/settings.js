//* API Server settings
const API_SERVER = {
    protocol: 'http',
    host: 'localhost',
    port: '8000',
};

const PORT_STR = API_SERVER.port === '' ? '' : `:${API_SERVER.port}`;
const API_BASE_URL = `${API_SERVER.protocol}://${API_SERVER.host}${PORT_STR}`;

//* Module export
module.exports = {
    API_BASE_URL,
};
