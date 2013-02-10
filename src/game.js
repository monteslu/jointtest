define([
  './draw',
  './entities',
  'frozen/box2d/BoxGame',
  'frozen/box2d/CircleEntity',
  'frozen/box2d/RectangleEntity',
  'frozen/box2d/joints/Revolute',
  'frozen/box2d/joints/Distance',
  'frozen/box2d/joints/Prismatic'

], function( draw, entities, BoxGame, Circle, Rectangle, Revolute, Distance, Prismatic){

  //setup a GameCore instance
  var game = new BoxGame({
    height: 440,
    width: 700,
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    canvasPercentage: 0.95,
    draw: draw
  });



  entities.objs.forEach(function(obj){
    var entity;
    if(!obj.staticBody){
      obj.restitution = 1.1;
    }
    if(obj.type === 'Rectangle'){
      entity = new Rectangle(obj);
    }else if(obj.type === 'Circle'){
      entity = new Circle(obj);
    }

    if(entity){
      game.box.addBody(entity);
      game.entities[entity.id] = entity;
    }
  });

  game.box.addJoint(new Revolute({bodyId1: 'wheel', bodyId2: 'car', id: 'rev'}));

  game.box.addJoint(new Distance({bodyId1: 'd1', bodyId2: 'd2', id: 'dist'}));

  game.box.addJoint(new Prismatic({bodyId1: 'p1', bodyId2: 'p2', id: 'pris'}));



  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});