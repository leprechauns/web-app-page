/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
//散点图表对象
var H5ComponentBar=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);

    $.each(cfg.data,function(idx,item){
        var line=$('<div class="line">');
        var name=$('<div class="name">');
        var rate=$('<div class="rate">');
        var per=$('<div class="per">');

        var width=item[1]*100+'%';
        var bgStyle='';
        if(item[2]){
            bgStyle='style="background-color:'+item[2]+'"';
        }

        rate.html('<div class="bg" '+bgStyle+'>');
        rate.css('width',width);

        per.text(width);
        name.text(item[0]);
        line.append(name).append(rate).append(per);
        component.append(line);
    });





    return component;




};
