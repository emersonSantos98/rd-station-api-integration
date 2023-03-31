const pool = require("../../config/database")

const getRdStation = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM tb_user where id = '${id}'`, (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json({
            total: results.length,
            users: results
        });



    });
};


module.exports = {
    getRdStation,
  }

