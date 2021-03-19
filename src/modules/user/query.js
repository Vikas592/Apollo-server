module.exports = {
    Query: {
        getMyProfile: () => {
            console.log('object');
            return {
                id: 1,
                name: 'Vikas',
                email: 'vikas.choubey@successive.tech',
            };
        }
    }
};

