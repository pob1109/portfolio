const db = require('./db');

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getBoard: () => executeQuery('SELECT * FROM board'),
    getPagingBoard: (page,pageSize,searchKeyword) => executeQuery('SELECT * FROM board WHERE title LIKE ? LIMIT ?,? ',['%'+searchKeyword+'%',page,pageSize,]),
    getPostById: (id) => executeQuery('SELECT * FROM board WHERE id = ?', [id]),
    addNewPost: (title,content) => executeQuery('INSERT INTO board (title, content) VALUES (?, ?)',[title, content]),
    updatePost: (id,title,content) => executeQuery('UPDATE board SET title = ?, content = ? WHERE id = ?', [title,content,id]),
    deletePostById: (id) => executeQuery('DELETE FROM board WHERE id = ?',[id]),
    countTotalPost: (searchKeyword) => executeQuery('SELECT COUNT(*) FROM board WHERE title LIKE ?',['%'+searchKeyword+'%']),
};
