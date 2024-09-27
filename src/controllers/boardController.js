const boardService = require('../services/boardService');
const asyncHandler = require('express-async-handler')

const boardController = {
    getBoard : asyncHandler(async(req, res, next) => {
        const boardsData = await boardService.getBoard();
        res.status(200).json(boardsData);
    }),

    getPost : asyncHandler(async(req, res, next) => {
        const postId = req.params.id;
        const boardData = await boardService.getPostById(postId);
        res.status(200).json(boardData[0]);
    }),

    writePost : asyncHandler(async(req, res, next) => {
        const {title,content} = req.body;
        await boardService.addNewPost(title,content);
        res.status(201).send('success');
    }),

    modifyPost : asyncHandler(async(req,res,next)=>{
        const postId = req.params.id;
        const {title,content} = req.body;
        await boardService.updatePost(postId,title,content);
        res.status(200).send('success');  
    }),

    deletePost : asyncHandler(async(req, res, next) => {
        const postId = req.params.id;
        await boardService.deletePostById(postId);
        res.status(200).send('success');
    }),
}

module.exports = boardController;
