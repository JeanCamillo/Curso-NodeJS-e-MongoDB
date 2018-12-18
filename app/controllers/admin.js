module.exports.formulario_inclusao_noticia = function(application,req,res){
    res.render('admin/form_add_noticia', {validacao:{},noticia:{}});
}

module.exports.noticias_salvar = function(application,req,res){
    var noticia = req.body;  
        
    req.assert('titulo','O titulo é obrigatório').notEmpty();
    req.assert('resumo','O resumo é obrigatório').notEmpty();        
    req.assert('resumo','O resumo deve conter entre 5 e 50 caracteres').len(5,50);
    req.assert('autor','O autor é obrigatório').notEmpty();              
    req.assert('data_noticia').custom(isValidDate).withMessage('A data é obrigatória, e o padrão é YYYY-MM-DD');
    req.assert('noticia','A notícia é obrigatório').notEmpty();      

    var errors = req.validationErrors();
   
    if(errors){
        res.render('admin/form_add_noticia', {validacao : errors, noticia : noticia});
        return;
    }else{
        
        var connection = application.config.dbConnection();
        var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

        NoticiasDAO.salvarNoticia(noticia, function(error, result){
            res.redirect('/noticias');
        });
    }
}

function isValidDate(value) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
    
    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}