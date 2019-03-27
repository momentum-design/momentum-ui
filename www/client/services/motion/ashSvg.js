(function(){
    var regNum=/(-?\d+)(\.\d+)?/g,
        regOne = /[MmLlHzVvAaQqTtCcSsZz][^MmLlHzVvAaQqTtCcSsZz]*/g;

    var Graph = function(){

    };
    Graph.prototype={};

    var LevenshteinDistance = function(source,target) {
        // body...
        this.Source = source;
        this.Target = target;
        this.Ls = source.length;
        this.Lt = target.length;
        this.init();
    };
    LevenshteinDistance.prototype={
        insertCost:function(){
            return 1;
        },
        substituteCost:function(source,target){
            if(source === target){
                return 0;
            }
            //traditional 
            else{
                return 2;
            }
            //customize
            if(source==='A' && target !== 'L'){
                return 2;
            }
            if(target==='A' && source !== 'L'){
                return 2;
            }
            if(target === 'M' || source === 'M' || target === 'Z' || source === 'z'){
                return 2;
            }
            return 0;
        },
        deleteCost:function(){
            return 1;
        },
        min:function(a,b,c){
            var min = a,
                i=0;
            if(min>b){
                min = b;
                i=1;
            }
            if(min>c){
                min = c;
                i=2;
            }
            return {
                val:min,
                idx:i
            };
        },
        init:function(){
            var map = [],
                route = [],
                source = this.Source,
                target = this.Target,
                sourceL = this.Ls,
                targetL = this.Lt;
            var i=0,li=sourceL+1,
                j=1,lj= targetL+1;
            //init border
            for(;i<li;i++){
                map.push(new Array(lj));
                map[i][0]=i;
            }
            for(;j<lj;j++){
                map[0][j]=j;
            }
            //calculate
            var ipre=0,
                jpre;
            for(i=1;i<li;i++){
                jpre = 0;
                for(j=1;j<lj;j++){
                    map[i][j]= this.min(map[ipre][j]+this.insertCost(),map[ipre][jpre]+this.substituteCost(source[jpre],target[ipre]),map[i][jpre]+this.deleteCost()).val;
                    jpre = j;   
                }
                ipre = i;
            }
            this.Cost = map[li-1][lj-1];
            this.Map = map;

            //print 
            
            var line;
            for(j=0;j<lj;j++){
                line=[];
                for(i=0;i<li;i++){   
                    line.push(map[i][j]);
                }
                console.log(line.join(' ')); 
            }
            

            //route
            i=1;
            j=1;
            var iNext,
                jNext,
                removeVal,// >
                addVal,   // v
                sliceVal, // \
                nextPos,
                currentCmd='start';
            route.push({
                x:i,
                y:j,
                cmd:currentCmd
            });

            do{
                iNext = i+1;
                jNext = j+1;
                removeVal = iNext<li ? map[iNext][j] : Infinity;
                addVal = jNext< lj ? map[i][jNext] : Infinity;
                sliceVal = (iNext<li  && jNext< lj) ? map[iNext][jNext] : Infinity;
                nextPos = this.min(removeVal,addVal,sliceVal);
                if(nextPos === Infinity) break;

                switch(nextPos.idx){
                    case 0:
                        currentCmd = 'remove';
                        i=iNext;
                        break;
                    case 1:
                        currentCmd = 'add';
                        j= jNext;
                        break;
                    case 2:
                        currentCmd = map[i][j] ===  nextPos.val ? 'equal' : 'replace';
                        i=iNext;
                        j=jNext;
                        break;
                }
                route.push({
                    x:i,
                    y:j,
                    cmd:currentCmd
                });
                //console.log([i,j,currentCmd].join(' ')); 
            }
            while(i !== sourceL || j !== targetL);
            this.Route = route;
            
            for(i=0;i<route.length;i++){
                console.log(route[i].x,route[i].y,route[i].cmd);
            }
            
        }
    };

    window.LevenshteinDistance = LevenshteinDistance;

    var Convert=new function(){
        var me = this;
        this.A2C = function(){

        };
        this.Q2C = function(){

        };
        this.T2C = function(){

        };
        this.S2C = function(){

        };

        this.Cricle2Arc = function(cx,cy,rx,ry,theta,delta,phi){
            var endTheta,phiRad,
                x0,y0,x1,y1,largeArc,sweep;

            theta = theta * Math.PI / 180.0;
            endTheta = (theta+delta)*Math.PI/180;
            phiRad = phi * Math/180.0;

            x0 = cx + Math.cos(phiRad) * rx * Math.cos(theta) + Math.sin(-phiRad) * ry * Math.sin(theta);
            y0 = cy + Math.sin(phiRad) * rx * Math.cos(theta) + Math.cos(phiRad) * ry * Math.sin(theta);
            x1 = cx + Math.cos(phiRad) * rx * Math.cos(endTheta) + Math.sin(-phiRad) * ry * Math.sin(endTheta);
            y1 = cy + Math.sin(phiRad) * rx * Math.cos(endTheta) + Math.cos(phiRad) * ry * Math.sin(endTheta);

            largeArc = (delta>180) ? 1:0;
            sweep = (delta>0) ? 1:0;
            return [x0,y0,rx,ry,phi,largeArc,sweep,x1,y1];
        };

        this.Arc2Cricle = function(x0,y0,rx,ry,xAngle,largeArcFlag,sweepFlag,x,y){
            var dx2 = (x0-x)/2.0,
                dy2 = (y0-y)/2.0,
                xAngle = Math.PI * (xAngle % 360.0)/180.0,
                cosXAngle = Math.cos(xAngle),
                sinXAngle = Math.sin(xAngle),
                x1 = (cosXAngle * dx2 + sinXAngle * dy2),
                y1 = (-sinXAngle * dx2 + cosXAngle * dy2);

            rx = Math.abs(rx);
            ry = Math.abs(ry);

            var rxSq = rx * rx,
                rySq = ry * ry,
                x1Sq = x1 * x1,
                y1Sq = y1 * y1;

            var radiiCheck = x1Sq/rxSq + y1Sq/rySq;
            if(radiiCheck>1){
                rx = Math.sqrt(radiiCheck)* rx;
                ry = Math.sqrt(radiiCheck) * ry;
                rxSq = rx * rx;
                rySq = ry * ry;
            }
            var sign = (largeArcFlag === sweepFlag) ? -1:1,
                sq = ((rxSq*rySq)-(rxSq * y1Sq) -(rySq*x1Sq))/((rxSq * y1Sq)+(rySq*x1Sq));
            sq = sq <0 ? 0 :sq;
            var coef = (sign* Math.sqrt(sq)),
                cx1 = coef * ((rx *y1)/ry),
                cy1 = coef * -((ry * x1)/rx);

            var sx2 = (x0+x)/2.0,
                sy2 = (y0+y)/2.0,
                cx = sx2 +(cosXAngle * cx1 - sinXAngle * cy1),
                cy = sy2 +(sinXAngle * cx1 + cosXAngle * cy1);

            var ux = (x1-cx1)/rx,
                uy = (y1-cy1)/ry,
                vx = (-x1-cx1)/rx,
                vy = (-y1-cy1)/ry,
                n = Math.sqrt(ux*ux + uy*uy),
                p = ux,
                sign = (uy<0) ? -1.0 :1.0,
                angleStart = 180* (sign * Math.acos(p/n)) /Math.PI;

            n = Math.sqrt((ux*ux+uy*uy)*(vx*vx+vy*vy));
            p = ux*vx + uy*vy;
            sign = (ux * vy - uy * vx) <0 ? -1:1;

            var angleExtent = 180.0*(sign*Math.acos(p/n))/Math.PI;

            if(!sweepFlag && angleExtent >0){
                angleExtent -= 360;
            }else if(sweepFlag && angleExtent<0){
                angleExtent += 360;
            }

            angleExtent %= 360;
            angleStart %= 360;

            return [cx,cy,rx,ry,angleStart,angleExtent,xAngle];
        };

    };

    var Path = function(str){
        this.Str = str;
        this.complieOrder();
        this.Part = [];
    };
    Path.prototype={
        init:function(){

        },
        complieOrder:function(){
            var me=this,
                orders = this.Str.match(regOne);

            var i=0,
                l=orders.length,
                state ={
                    data:[],
                    needNew:true,
                    pre:[],//position
                    preCMD:null
                },
                str='';
            for(;i<l;i++){
                str+=this.factory[orders[i][0]](state,orders[i].match(regNum));
            }
            console.log(str);
        },
        factory:{
            M:function(state,arr){
                var d = '';
                if(arr.length>1){
                    d = 'M';
                    state.pre=[+arr.shift(),+arr.shift()];
                    if(state.needNew){
                        state.data.push([state.pre[0],state.pre[1]]);
                        state.needNew = false;
                    }
                    d+=state.pre.join(' ');
                    //do
                    if(arr.length>2){
                        d+=this.L(state,arr);
                    }
                    state.preCMD = 'M';
                }
                return d;
            },
            m:function(state,arr){
                var d = '';
                if(arr.length>1){
                    d = 'M';
                    if(state.pre===[]){
                        state.pre=[+arr.shift(),+arr.shift()];
                    }else{
                        state.pre=[+arr.shift()+state.pre[0],+arr.shift()+state.pre[1]];
                    }
                    if(state.needNew){
                        state.data.push([state.pre[0],state.pre[1]]);
                        state.needNew = false;
                    }
                    d+=state.pre.join(' ');
                    //do
                    if(arr.length>2){
                        d+=this.l(state,arr);
                    }
                    state.preCMD = 'M';
                }
                return d;
            },
            L:function(state,arr){             
                var d='';
                if(arr.length>1){
                    d ='L';
                    state.pre = [+arr.shift(),+arr.shift()];
                    d += state.pre.join(' ');
                    while(arr.length>1){
                        state.pre = [+arr.shift(),+arr.shift()];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            l:function(state,arr){
                var d='';
                if(arr.length>1){
                    d ='L';
                    state.pre = [+arr.shift()+state.pre[0],+arr.shift()+state.pre[1]];
                    d += pre.join(' ');
                    while(arr.length>1){
                        state.pre = [+arr.shift()+state.pre[0],+arr.shift()+state.pre[1]];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            Z:function(state,arr){
                var _aim = state.data[state.data.length-1];
                state.pre = [_aim[0],_aim[1]];
                state.needNew = true;
                state.preCMD = 'Z';
                return 'Z ';
            },
            z:function(state,arr){
                return this.Z(state,arr);
            },
            H:function(state,arr){
                var d='';
                if(arr.length>0){
                    d ='L';
                    state.pre = [+arr.shift(),state.pre[1]];
                    d += pre.join(' ');
                    while(arr.length>0){
                        state.pre = [+arr.shift(),state.pre[1]];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            h:function(state,arr){
                var d='';
                if(arr.length>0){
                    d ='L';
                    state.pre = [+arr.shift()+state.pre[0],state.pre[1]];
                    d += pre.join(' ');
                    while(arr.length>0){
                        state.pre = [+arr.shift()+state.pre[0],state.pre[1]];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            V:function(state,arr){
                var d='';
                if(arr.length>0){
                    d ='L';
                    state.pre = [state.pre[0],+arr.shift()];
                    d += pre.join(' ');
                    while(arr.length>0){
                        state.pre = [state.pre[0],+arr.shift()];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            v:function(state,arr){
                var d='';
                if(arr.length>0){
                    d ='L';
                    state.pre = [state.pre[0],+arr.shift()+tate.pre[1]];
                    d += pre.join(' ');
                    while(arr.length>0){
                        state.pre = [state.pre[0],+arr.shift()+tate.pre[1]];
                        d += ' '+state.pre.join(' ');
                    }
                    state.preCMD = 'L';
                }
                return d;
            },
            A:function(state,arr){
                var d = '';
                if(arr.length>6){
                    d = 'A';
                    var r1 = +arr.shift(),
                        r2 = +arr.shift(),
                        rotation = +arr.shift(),
                        lflag = +arr.shift(),
                        sflag = +arr.shift(),
                        x = +arr.shift(),
                        y = +arr.shift();
                    state.pre = [x,y];
                    d+=[r1,r2,rotation,lflag,sflag,x,y].join(' ');
                    while(arr.length>6){
                        r1 = +arr.shift();
                        r2 = +arr.shift();
                        rotation = +arr.shift();
                        lflag = +arr.shift();
                        sflag = +arr.shift();
                        x = +arr.shift();
                        y = +arr.shift();
                        state.pre = [x,y];
                        d+=[' ',r1,r2,rotation,lflag,sflag,x,y].join(' ');
                    }
                    state.preCMD = 'A';
                }
                return d;
            },
            a:function(state,arr){
                var d = '';
                if(arr.length>6){
                    d = 'A';
                    var r1 = +arr.unshift(),
                        r2 = +arr.unshift(),
                        rotation = +arr.unshift(),
                        lflag = +arr.unshift(),
                        sflag = +arr.unshift(),
                        x = +arr.unshift()+state.pre[0],
                        y = +arr.unshift()+state.pre[1];
                    state.pre = [x,y];
                    d+=[r1,r2,rotation,lflag,sflag,x,y].join(' ');
                    while(arr.length>6){
                        r1 = +arr.unshift();
                        r2 = +arr.unshift();
                        rotation = +arr.unshift();
                        lflag = +arr.unshift();
                        sflag = +arr.unshift();
                        x = +arr.unshift()+state.pre[0];
                        y = +arr.unshift()+state.pre[1];
                        state.pre = [x,y];
                        d+=[' ',r1,r2,rotation,lflag,sflag,x,y].join(' ');
                    }
                    state.preCMD = 'A';
                }
                return d;
            },
            Q:function(state,arr){
                var d = '';
                if(arr.length>3){
                    d = 'Q';
                    var cx = +arr.shift(),
                        cy = +arr.shift(),
                        x = +arr.shift(),
                        y = +arr.shift();
                    state.pre = [x,y];
                    state.preControl = [cx,cy];
                    d+=[cx,cy,x,y].join(' ');
                    while(arr.length>3){
                        cx = +arr.shift();
                        cy = +arr.shift();
                        x = +arr.shift();
                        y = +arr.shift();
                        state.pre = [x,y];
                        state.preControl = [cx,cy];
                        d+=[' ',cx,cy,x,y].join(' ');
                    }
                    state.preCMD = 'Q';
                }
                return d;
            },
            q:function(state,arr){
                var d = '';
                if(arr.length>3){
                    d = 'Q';
                    var cx = +arr.shift()+state.pre[0],
                        cy = +arr.shift()+state.pre[1],
                        x = +arr.shift()+cx,
                        y = +arr.shift()+cy;
                    state.pre = [x,y];
                    state.preControl = [cx,cy];
                    d+=[cx,cy,x,y].join(' ');
                    while(arr.length>3){
                        cx = +arr.shift()+state.pre[0];
                        cy = +arr.shift()+state.pre[1];
                        x = +arr.shift()+cx;
                        y = +arr.shift()+cy;
                        state.pre = [x,y];
                        state.preControl = [cx,cy];
                        d+=[' ',cx,cy,x,y].join(' ');
                    }
                    state.preCMD = 'Q';
                }
                return d;
            },
            T:function(state,arr){
                var d = '';
                if(arr.length>1){
                    d = 'T';
                    var x = +arr.shift(),
                        y = +arr.shift(),
                        cx,cy;
                    if(state.preCMD==='Q' || state.preCMD==='T'){
                        cx = state.pre[0]*2-state.preControl[0];
                        cy = state.pre[1]*2-state.preControl[1];
                    }else{
                        cx = x;
                        cy = y;
                    }
                    state.pre = [x,y];
                    state.preControl = [cx,cy];
                    d+=[x,y].join(' ');
                    while(arr.length>1){
                        cx = state.pre[0]*2-state.preControl[0];
                        cy = state.pre[1]*2-state.preControl[1];
                        x = +arr.shift();
                        y = +arr.shift();
                        state.pre = [x,y];
                        state.preControl = [cx,cy];
                        d+=[' ',cx,cy,x,y].join(' ');
                    }
                    state.preCMD = 'T';
                }
                return d;
            },
            t:function(state,arr){
                var d = '';
                if(arr.length>1){
                    d = 'T';
                    var x = +arr.shift()+state.pre[0],
                        y = +arr.shift()+state.pre[1],
                        cx,cy;
                    if(state.preCMD==='Q' || state.preCMD==='T'){
                        cx = state.pre[0]*2-state.preControl[0];
                        cy = state.pre[1]*2-state.preControl[1];
                    }else{
                        cx = x;
                        cy = y;
                    }
                    state.pre = [x,y];
                    state.preControl = [cx,cy];
                    d+=[x,y].join(' ');
                    while(arr.length>1){
                        cx = (state.preControl[0]+state.pre[0])/2;
                        cy = (state.preControl[1]+state.pre[1])/2;
                        x = +arr.shift()+state.pre[0];
                        y = +arr.shift()+state.pre[1];
                        state.pre = [x,y];
                        state.preControl = [cx,cy];
                        d+=[' ',cx,cy,x,y].join(' ');
                    }
                    state.preCMD = 'T';
                }
                return d;
            },
            C:function(state,arr){
                var d = '';
                if(arr.length>5){
                    d = 'C';
                    var cx1 = +arr.shift(),
                        cy1 = +arr.shift(),
                        cx2 = +arr.shift(),
                        cy2 = +arr.shift(),
                        x = +arr.shift(),
                        y = +arr.shift();

                    state.pre = [x,y];
                    state.preControl = [cx2,cy2];
                    d+=[cx1,cy1,cx2,cy2,x,y].join(' ');
                    while(arr.length>5){
                        cx1 = +arr.shift();
                        cy1 = +arr.shift();
                        cx2 = +arr.shift();
                        cy2 = +arr.shift();
                        x = +arr.shift();
                        y = +arr.shift();
                        state.pre = [x,y];
                        state.preControl = [cx2,cy2];
                        d+=[' ',cx1,cy1,cx2,cy2,,x,y].join(' ');
                    }
                    state.preCMD = 'C';
                }
                return d;
            },
            c:function(state,arr){
                var d = '';
                if(arr.length>5){
                    d = 'C';
                    var cx1 = +arr.shift()+state.pre[0],
                        cy1 = +arr.shift()+state.pre[1],
                        cx2 = +arr.shift()+cx1,
                        cy2 = +arr.shift()+cy1,
                        x = +arr.shift()+cx2,
                        y = +arr.shift()+cy2;

                    state.pre = [x,y];
                    state.preControl = [cx2,cy2];
                    d+=[cx1,cy1,cx2,cy2,x,y].join(' ');
                    while(arr.length>5){
                        cx1 = +arr.shift()+state.pre[0];
                        cy1 = +arr.shift()+state.pre[1];
                        cx2 = +arr.shift()+cx1;
                        cy2 = +arr.shift()+cy1;
                        x = +arr.shift()+cx2;
                        y = +arr.shift()+cy2;
                        state.pre = [x,y];
                        state.preControl = [cx2,cy2];
                        d+=[' ',cx1,cy1,cx2,cy2,,x,y].join(' ');
                    }
                    state.preCMD = 'C';
                }
                return d;
            },
            S:function(state,arr){
                var d = '';
                if(arr.length>3){
                    d = 'S';
                    var cx2 = +arr.shift(),
                        cy2 = +arr.shift(),
                        x = +arr.shift(),
                        y = +arr.shift(),
                        cx1,cy1;
                    if(state.preCMD==='S' || state.preCMD==='C'){
                        cx1 = state.pre[0]*2-state.preControl[0];
                        cy1 = state.pre[1]*2-state.preControl[1];
                    }else{
                        cx1 = cx2;
                        cy1 = cy2;
                    }
                    state.pre = [x,y];
                    state.preControl = [cx2,cy2];
                    d+=[cx2,cy2,x,y].join(' ');
                    while(arr.length>3){
                        cx1 = state.pre[0]*2-state.preControl[0];
                        cy1 = state.pre[1]*2-state.preControl[1];
                        cx2 = +arr.shift();
                        cy2 = +arr.shift();
                        x = +arr.shift();
                        y = +arr.shift();
                        state.pre = [x,y];
                        state.preControl = [cx2,cy2];
                        d+=[' ',cx2,cy2,x,y].join(' ');
                    }
                    state.preCMD = 'S';
                }
                return d;
            },
            s:function(state,arr){
                var d = '';
                if(arr.length>3){
                    d = 'S';
                    var cx2 = +arr.shift()+state.pre[0],
                        cy2 = +arr.shift()+state.pre[1],
                        x = +arr.shift()+cx2,
                        y = +arr.shift()+cy2,
                        cx1,cy1;
                    if(state.preCMD==='S' || state.preCMD==='C'){
                        cx1 = state.pre[0]*2-state.preControl[0];
                        cy1 = state.pre[1]*2-state.preControl[1];
                    }else{
                        cx1 = cx2;
                        cy1 = cy2;
                    }
                    state.pre = [x,y];
                    state.preControl = [cx2,cy2];
                    d+=[cx2,cy2,x,y].join(' ');
                    while(arr.length>3){
                        cx1 = state.pre[0]*2-state.preControl[0];
                        cy1 = state.pre[1]*2-state.preControl[1];
                        cx2 = +arr.shift()+state.pre[0];
                        cy2 = +arr.shift()+state.pre[1];
                        x = +arr.shift()+cx2;
                        y = +arr.shift()+cy2;
                        state.pre = [x,y];
                        state.preControl = [cx2,cy2];
                        d+=[' ',cx2,cy2,x,y].join(' ');
                    }
                    state.preCMD = 'S';
                }
                return d;
            }
        }
    };

    var IRDSVG = new function(){
        this.Name = 'svg';
        this.before = function(time){

        };
        this.excute = function(sprite,time){
            //sprite.delegate(time,sprite.time);
        };
        this.preExcute = function(time){

        };


        this.load = function(){

        };
    };

    window.Path= Path;

    $(function(){
        
        var testStr=['M 30 30 L 50 5 z',
        'M302 152 A 75 60, 0, 1,1,302 152',
        'M30 100 Q 80 30,100 100 T 200 80',
        'M6.25,0 C2.8,0 0,2.8 0,6.25 C0,9.7 2.8,12.5 6.25,12.5 C9.7,12.5 12.5,9.7 12.5,6.25 C12.5,2.8 9.7,0 6.25,0';
        var ps=[];

        for(var i=0,l= testStr.length;i<l;i++){
            ps.push(new Path(testStr[i]));
        }

        var line1='00A00B00C',
            line2='A0B00C000A00B';

        var macth = function(l1,l2){

        };
        

        //var d1 = new LevenshteinDistance('sot','stop');


    });

})();