module.exports = function(){

    this.getNoticias = function(connection, callback){
        connection.query('select * from noticias', callback);
    }

    this.getNoticia = function(connection, callback){
        connection.query('SELECT * FROM noticias WHERE id_noticia = 1',callback);
    }

    this.salvarNoticia = function(noticia, connection, callback){
        connection.query('INSERT INTO noticias SET ?', noticia, callback)
    }
    return this;
}