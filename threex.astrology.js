
var THREEx=THREEx||{};THREEx.addAtmosphereMaterial2DatGui=function(material,datGui){datGui=datGui||new dat.GUI()
var uniforms=material.uniforms
var options={coeficient:uniforms['coeficient'].value,power:uniforms['power'].value,glowColor:'#'+uniforms.glowColor.value.getHexString(),presetFront:function(){options.coeficient=1
options.power=2
onChange()},presetBack:function(){options.coeficient=0.5
options.power=4.0
onChange()},}
var onChange=function(){uniforms['coeficient'].value=options.coeficient
uniforms['power'].value=options.power
uniforms.glowColor.value.set(options.glowColor);}
onChange()
datGui.add(options,'coeficient',0.0,2).listen().onChange(onChange)
datGui.add(options,'power',0.0,30).listen().onChange(onChange)
datGui.addColor(options,'glowColor').listen().onChange(onChange)
datGui.add(options,'presetFront')
datGui.add(options,'presetBack')}
var THREEx=THREEx||{}
THREEx.createAtmosphereMaterial=function(){var vertexShader=['varying vec3 vVertexWorldPosition;','varying vec3 vVertexNormal;','void main(){',' vVertexNormal = normalize(normalMatrix * normal);',' vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',' // set gl_Position',' gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);','}',].join('\n')
var fragmentShader=['uniform vec3 glowColor;','uniform float coeficient;','uniform float power;','varying vec3 vVertexNormal;','varying vec3 vVertexWorldPosition;','void main(){',' vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',' vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',' viewCameraToVertex = normalize(viewCameraToVertex);',' float intensity  = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',' gl_FragColor  = vec4(glowColor, intensity);','}',].join('\n')
var material=new THREE.ShaderMaterial({uniforms:{coeficient:{type:"f",value:1.0},power:{type:"f",value:2},glowColor:{type:"c",value:new THREE.Color('pink')},},vertexShader:vertexShader,fragmentShader:fragmentShader,transparent:true,depthWrite:false,});return material}
var THREEx=THREEx||{}
THREEx.Planets={}
THREEx.Planets.baseURL='https://dl.dropboxusercontent.com/u/5409438/sbss/images/'
THREEx.Planets.createSun=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var texture=THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'sunmap.jpg')
var material=new THREE.MeshPhongMaterial({map:texture,bumpMap:texture,bumpScale:0.005,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createMercury=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'mercurymap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'mercurybump.jpg'),bumpScale:0.005,specularMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'mercuryspec.jpg'),specular:new THREE.Color('grey'),})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createVenus=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'venusmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'venusbump.jpg'),bumpScale:0.0005,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createEarth=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'earthmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'earthbump.jpg'),bumpScale:0.05,specularMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'earthspec.jpg'),specular:new THREE.Color('grey'),})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createEarthCloud=function(){var canvasResult=document.createElement('canvas')
canvasResult.width=1024
canvasResult.height=512
var contextResult=canvasResult.getContext('2d')
var imageMap=new Image();imageMap.addEventListener("load",function(){var canvasMap=document.createElement('canvas')
canvasMap.width=imageMap.width
canvasMap.height=imageMap.height
var contextMap=canvasMap.getContext('2d')
contextMap.drawImage(imageMap,0,0)
var dataMap=contextMap.getImageData(0,0,canvasMap.width,canvasMap.height)
var imageTrans=new Image();imageTrans.addEventListener("load",function(){var canvasTrans=document.createElement('canvas')
canvasTrans.width=imageTrans.width
canvasTrans.height=imageTrans.height
var contextTrans=canvasTrans.getContext('2d')
contextTrans.drawImage(imageTrans,0,0)
var dataTrans=contextTrans.getImageData(0,0,canvasTrans.width,canvasTrans.height)
var dataResult=contextMap.createImageData(canvasMap.width,canvasMap.height)
for(var y=0,offset=0;y<imageMap.height;y++){for(var x=0;x<imageMap.width;x++,offset+=4){dataResult.data[offset+0]=dataMap.data[offset+0]
dataResult.data[offset+1]=dataMap.data[offset+1]
dataResult.data[offset+2]=dataMap.data[offset+2]
dataResult.data[offset+3]=255-dataTrans.data[offset+0]}}
contextResult.putImageData(dataResult,0,0)
material.map.needsUpdate=true;})
imageTrans.src=THREEx.Planets.baseURL+'earthcloudmaptrans.jpg';},false);imageMap.src=THREEx.Planets.baseURL+'earthcloudmap.jpg';var geometry=new THREE.SphereGeometry(0.51,32,32)
var material=new THREE.MeshPhongMaterial({map:new THREE.Texture(canvasResult),side:THREE.DoubleSide,transparent:true,opacity:0.8,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createMoon=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'moonmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'moonbump.jpg'),bumpScale:0.005,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createMars=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'marsmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'marsbump.jpg'),bumpScale:0.05,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createJupiter=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'jupitermap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'jupiterbump.jpg'),bumpScale:0.005,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createSaturn=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'saturnmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'saturnbump.jpg'),bumpScale:0.02,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createSaturnRing=function(){var canvasResult=document.createElement('canvas')
canvasResult.width=915
canvasResult.height=64
var contextResult=canvasResult.getContext('2d')
var imageMap=new Image();imageMap.addEventListener("load",function(){var canvasMap=document.createElement('canvas')
canvasMap.width=imageMap.width
canvasMap.height=imageMap.height
var contextMap=canvasMap.getContext('2d')
contextMap.drawImage(imageMap,0,0)
var dataMap=contextMap.getImageData(0,0,canvasMap.width,canvasMap.height)
var imageTrans=new Image();imageTrans.addEventListener("load",function(){var canvasTrans=document.createElement('canvas')
canvasTrans.width=imageTrans.width
canvasTrans.height=imageTrans.height
var contextTrans=canvasTrans.getContext('2d')
contextTrans.drawImage(imageTrans,0,0)
var dataTrans=contextTrans.getImageData(0,0,canvasTrans.width,canvasTrans.height)
var dataResult=contextMap.createImageData(canvasResult.width,canvasResult.height)
for(var y=0,offset=0;y<imageMap.height;y++){for(var x=0;x<imageMap.width;x++,offset+=4){dataResult.data[offset+0]=dataMap.data[offset+0]
dataResult.data[offset+1]=dataMap.data[offset+1]
dataResult.data[offset+2]=dataMap.data[offset+2]
dataResult.data[offset+3]=255-dataTrans.data[offset+0]/4}}
contextResult.putImageData(dataResult,0,0)
material.map.needsUpdate=true;})
imageTrans.src=THREEx.Planets.baseURL+'saturnringpattern.gif';},false);imageMap.src=THREEx.Planets.baseURL+'saturnringcolor.jpg';var geometry=new THREEx.Planets._RingGeometry(0.55,0.75,64);var material=new THREE.MeshPhongMaterial({map:new THREE.Texture(canvasResult),side:THREE.DoubleSide,transparent:true,opacity:0.8,})
var mesh=new THREE.Mesh(geometry,material)
mesh.lookAt(new THREE.Vector3(0.5,-4,1))
return mesh}
THREEx.Planets.createUranus=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'uranusmap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'uranusbump.jpg'),bumpScale:0.02,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createUranusRing=function(){var canvasResult=document.createElement('canvas')
canvasResult.width=1024
canvasResult.height=72
var contextResult=canvasResult.getContext('2d')
var imageMap=new Image();imageMap.addEventListener("load",function(){var canvasMap=document.createElement('canvas')
canvasMap.width=imageMap.width
canvasMap.height=imageMap.height
var contextMap=canvasMap.getContext('2d')
contextMap.drawImage(imageMap,0,0)
var dataMap=contextMap.getImageData(0,0,canvasMap.width,canvasMap.height)
var imageTrans=new Image();imageTrans.addEventListener("load",function(){var canvasTrans=document.createElement('canvas')
canvasTrans.width=imageTrans.width
canvasTrans.height=imageTrans.height
var contextTrans=canvasTrans.getContext('2d')
contextTrans.drawImage(imageTrans,0,0)
var dataTrans=contextTrans.getImageData(0,0,canvasTrans.width,canvasTrans.height)
var dataResult=contextMap.createImageData(canvasResult.width,canvasResult.height)
for(var y=0,offset=0;y<imageMap.height;y++){for(var x=0;x<imageMap.width;x++,offset+=4){dataResult.data[offset+0]=dataMap.data[offset+0]
dataResult.data[offset+1]=dataMap.data[offset+1]
dataResult.data[offset+2]=dataMap.data[offset+2]
dataResult.data[offset+3]=255-dataTrans.data[offset+0]/2}}
contextResult.putImageData(dataResult,0,0)
material.map.needsUpdate=true;})
imageTrans.src=THREEx.Planets.baseURL+'uranusringtrans.gif';},false);imageMap.src=THREEx.Planets.baseURL+'uranusringcolour.jpg';var geometry=new THREEx.Planets._RingGeometry(0.55,0.75,64);var material=new THREE.MeshPhongMaterial({map:new THREE.Texture(canvasResult),side:THREE.DoubleSide,transparent:true,opacity:0.8,})
var mesh=new THREE.Mesh(geometry,material)
mesh.lookAt(new THREE.Vector3(0.5,-4,1))
return mesh}
THREEx.Planets.createNeptune=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'neptunemap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'neptunebump.jpg'),bumpScale:0.02,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createPluto=function(){var geometry=new THREE.SphereGeometry(0.5,32,32)
var material=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'plutomap.jpg'),bumpMap:THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'plutobump.jpg'),bumpScale:0.005,})
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets.createStarfield=function(){var texture=THREE.ImageUtils.loadTexture('http://www.supinemusic.net/Files%20for%20Cloud%20projects/Cinema%204D/plugins/Planet%20X%20Generator%20R12/presets/stars/starfield.jpg')
var material=new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
var geometry=new THREE.SphereGeometry(100,32,32)
var mesh=new THREE.Mesh(geometry,material)
return mesh}
THREEx.Planets._RingGeometry=function(innerRadius,outerRadius,thetaSegments){THREE.Geometry.call(this)
innerRadius=innerRadius||0
outerRadius=outerRadius||50
thetaSegments=thetaSegments||8
var normal=new THREE.Vector3(0,0,1)
for(var i=0;i<thetaSegments;i++){var angleLo=(i/thetaSegments)*Math.PI*2
var angleHi=((i+1)/thetaSegments)*Math.PI*2
var vertex1=new THREE.Vector3(innerRadius*Math.cos(angleLo),innerRadius*Math.sin(angleLo),0);var vertex2=new THREE.Vector3(outerRadius*Math.cos(angleLo),outerRadius*Math.sin(angleLo),0);var vertex3=new THREE.Vector3(innerRadius*Math.cos(angleHi),innerRadius*Math.sin(angleHi),0);var vertex4=new THREE.Vector3(outerRadius*Math.cos(angleHi),outerRadius*Math.sin(angleHi),0);this.vertices.push(vertex1);this.vertices.push(vertex2);this.vertices.push(vertex3);this.vertices.push(vertex4);var vertexIdx=i*4;var face=new THREE.Face3(vertexIdx+0,vertexIdx+1,vertexIdx+2,normal);var uvs=[]
var uv=new THREE.Vector2(0,0)
uvs.push(uv)
var uv=new THREE.Vector2(1,0)
uvs.push(uv)
var uv=new THREE.Vector2(0,1)
uvs.push(uv)
this.faces.push(face);this.faceVertexUvs[0].push(uvs);var face=new THREE.Face3(vertexIdx+2,vertexIdx+1,vertexIdx+3,normal);var uvs=[]
var uv=new THREE.Vector2(0,1)
uvs.push(uv)
var uv=new THREE.Vector2(1,0)
uvs.push(uv)
var uv=new THREE.Vector2(1,1)
uvs.push(uv)
this.faces.push(face);this.faceVertexUvs[0].push(uvs);}this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3(),outerRadius);};THREEx.Planets._RingGeometry.prototype=Object.create(THREE.Geometry.prototype);