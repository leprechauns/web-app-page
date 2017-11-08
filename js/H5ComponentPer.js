/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
//饼图对象
var H5ComponentPer=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);


    var w=cfg.width;
    var h=cfg.height;


    //todo 加入一个画布，背景层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    $(cns).css('zIndex',1);

    component.append(cns);

    var r=w/2;

    //todo 加入一个底图层
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth=1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //todo 绘制一个数据层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    $(cns).css('zIndex',2);

    component.append(cns);

    var colors=['red','green','blue','#a00','orange'];//备用颜色
    var sAngel=1.5*Math.PI;//todo 设置开始的角度在12点位置；
    console.log(sAngel);

    var eAngel=0;//todo 结束角度
    var aAngel=Math.PI*2;


    var step=cfg.data.length;
    for(var i=0;i<step;i++){
        var item=cfg.data[i];
        var color=item[2] || (item[2]=colors.pop());
        eAngel=sAngel+aAngel*item[1];
        console.log(eAngel);


        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth=.1;
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngel);
        ctx.fill();
        ctx.stroke();

        sAngel=eAngel;

        //todo 加入所有的项目文本以及百分比
        var text=$('<div class="text">');
        text.text(cfg.data[i][0]);
        var per=$('<div class="per">');
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);

        var x=r+Math.sin(.5*Math.PI-sAngel)*r;
        var y=r+Math.cos(.5*Math.PI-sAngel)*r;
        //text.css('left', x/2);
        //text.css('top', y/2);

        if(x>w/2){
            text.css('left', x/2);
        }else{
            text.css('right', (w-x)/2);
        }
        if(y> h/2){
            text.css('top', y/2);
        }else{
            text.css('bottom', (h-y)/2);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }
        text.css('opacity',0);

        component.append(text);


    }

    //todo 加入一个蒙版层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    $(cns).css('zIndex',3);
    component.append(cns);


    //todo 加入一个底图层

    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth=1;





    //todo 生长动画


    var draw=function(per){
        ctx.clearRect(0,0,w,h);

        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0);


        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
        }
        ctx.fill();
        ctx.stroke();

        if(per >=1){
            component.find('.text').css('opacity',1);
        }

};
    //draw(0);


    component.on('onLoad',function(){
        //饼图生长动画
        var s=0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500)
        }

    });

    component.on('onLeave',function(){
        var s=1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10+500)
        }
    });

    return component;




};
