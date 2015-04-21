/**
 * Created by Administrator on 15-4-21.
 */
exports.hasLogin = function (req, res, next) {
    if(req.session.user){
        return next();
    }
    return res.redirect('/login');
};
