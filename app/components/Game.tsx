import React = require("react");
import * as BABYLON from 'babylonjs';
import * as Fatina from 'fatina';

let styles = require('./Game.scss');

export class Game extends React.Component {
    componentDidMount() {
        Fatina.init();
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        var elem = document.getElementById('renderCanvas');
        if (elem) {
            elem.remove();
        }

        // Create the canvas DOM element
        var canvas = document.createElement("canvas");
        canvas.id = "renderCanvas";
        var container = document.getElementById('renderContainer');
        if (container) {
            container.appendChild(canvas);
        }
 
        // Load the 3D engine
        var engine = new BABYLON.Engine(canvas as any, true, {preserveDrawingBuffer: true, stencil: true});
        
        // CreateScene function that creates and return the scene
        var createScene = function(){
            // Create a basic BJS Scene object
            var scene = new BABYLON.Scene(engine);
            
            // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
            var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 3, 0), scene);

            // Target the camera to scene origin
            // camera.setTarget(BABYLON.Vector3.Zero());
            
            // Attach the camera to the canvas
            // camera.attachControl(canvas as any, true);
            
            var player = { x: 0, y: 0, orientation: 0 };
            var grid = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
            var lights = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 0, 3, 1, 0, 1, 0, 0, 3, 0, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 0, 0, 3, 1, 1, 1, 0, 1],
                [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 1, 3, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];

            var groundMat = new BABYLON.StandardMaterial("myMaterial", scene);
            groundMat.diffuseTexture = new BABYLON.Texture("assets/textures/Ground/GroundForest003_COL_VAR1_1K.jpg", scene);
            (groundMat.diffuseTexture as any).uScale = grid.length / 2;
            (groundMat.diffuseTexture as any).vScale = grid.length / 2;
            groundMat.bumpTexture = new BABYLON.Texture("assets/textures/Ground/GroundForest003_NRM_1K.jpg", scene);
            (groundMat.bumpTexture as any).uScale = grid.length / 2;
            (groundMat.bumpTexture as any).vScale = grid.length / 2;
            groundMat.specularTexture = new BABYLON.Texture("assets/textures/Ground/GroundForest003_GLOSS_1K.jpg", scene);
            (groundMat.specularTexture as any).uScale = grid.length / 2;
            (groundMat.specularTexture as any).vScale = grid.length / 2;
            groundMat.reflectionTexture = new BABYLON.Texture("assets/textures/Ground/GroundForest003_REFL_1K.jpg", scene);
            (groundMat.specularTexture as any).uScale = grid.length / 2;
            (groundMat.specularTexture as any).vScale = grid.length / 2;

            var wallMat = new BABYLON.StandardMaterial("myMaterial", scene);
            wallMat.diffuseTexture = new BABYLON.Texture("assets/textures/Wall/Bricks01_COL_VAR1_1K.jpg", scene);
            wallMat.bumpTexture = new BABYLON.Texture("assets/textures/Wall/Bricks01_NRM_1K.jpg", scene);
            wallMat.specularTexture = new BABYLON.Texture("assets/textures/Wall/Bricks01_GLOSS_1K.jpg", scene);
            wallMat.useParallax = true;
            wallMat.reflectionTexture = new BABYLON.Texture("assets/textures/Wall/Bricks01_REFL_1K.jpg", scene);

            var lightAmbiant = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(5, 5, -5), scene);
            lightAmbiant.intensity = 0.3;

            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            // var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -3, -1), scene);
            // light.intensity = 0.6;
            // light.position.y = 1;
            // light.autoUpdateExtends = false;

            var getX = function(x: number): number {
                return x * size - grid[0].length * size / 2 + size / 2
            }
            var getY = function(y: number): number {
                return grid.length * size - y * size - grid.length * size / 2 + size / 2
            }
            var move = function(direction: number) {
                switch ((player.orientation + 4) % 4) {
                    case 0:
                        return [0, -direction];
                    case 1:
                        return [direction, 0];
                    case 2:
                        return [0, direction];
                    case 3:
                        return [-direction, 0];
                }
                return [0, 0];
            }

            var size = 5;
            for (var y = 0; y < grid.length; y++) {
                for (var x = 0; x < grid[0].length; x++) {
                    switch (grid[y][x]) {
                        case 1:
                            var box = BABYLON.MeshBuilder.CreateBox("box", { size }, scene);
                            box.position.x = getX(x);
                            box.position.y = size / 2;
                            box.position.z = getY(y);
                            box.material = wallMat;
                            box.applyDisplacementMap("assets/textures/Ground/GroundForest003_DISP_1K.jpg", 0, 5);
                            break;
                        case 2:
                            player.x = x;
                            player.y = y;
                            camera.position.x = getX(x);
                            camera.position.z = getY(y);
                            break;
                    }
                    if (lights[y][x] === 3) {
                        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(getX(x), 4, getY(y)), scene);
                        light.intensity = 0.5;
                    }
                }
            }
            
            // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
            var ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: grid[0].length * size, height: grid.length * size, subdivisions: 8  }, scene);
            ground.material = groundMat;
            ground.receiveShadows = true;
            ground.position.y = -0.01;
            ground.applyDisplacementMap("assets/textures/Wall/Bricks01_DISP_1K.jpg", -100, 100);
            // ground.enableEdgesRendering(1-0.000000000000001);	
		    // ground.edgesWidth = 16;
            // ground.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
        
            var ceiling = BABYLON.MeshBuilder.CreateGround('ceiling1', { width: grid[0].length * size, height: grid.length * size, subdivisions: 8 }, scene);
            ceiling.material = groundMat;
            ceiling.position.y = size;
            ceiling.rotation.z = Math.PI;
            ground.applyDisplacementMap("assets/textures/Ground/GroundForest003_DISP_1K.jpg", 0, 5);

            (window as any).camera = camera;
            scene.actionManager = new BABYLON.ActionManager(scene);
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
                switch (evt.sourceEvent.key) {
                    case "ArrowUp":
                    case "w":
                        var dir = move(1);
                        if (grid[player.y + dir[1]][player.x + dir[0]] == 1) return;
                        player.x += dir[0];
                        player.y += dir[1];
                        Fatina.tween(camera.position)
                            .to({
                                x: getX(player.x),
                                z: getY(player.y)
                            }, 250)
                            .start();
                        break;
                    case "ArrowDown":
                    case "s":
                        var dir = move(-1);
                        if (grid[player.y + dir[1]][player.x + dir[0]] == 1) return;
                        player.x += dir[0];
                        player.y += dir[1];
                        Fatina.tween(camera.position)
                            .to({
                                x: getX(player.x),
                                z: getY(player.y)
                            }, 250)
                            .start();
                        break;
                    case "ArrowLeft":
                    case "a":
                        var next = (player.orientation - 1) % 4;
                        Fatina.tween(camera.rotation)
                            .to({y: (player.orientation - 1) * Math.PI / 2}, 250)
                            .onComplete(() => {
                                player.orientation = next;
                                camera.rotation.y = player.orientation * Math.PI / 2
                            })
                            .start();
                        break;
                    case "ArrowRight":
                    case "d":
                        var next = (player.orientation + 1) % 4;
                        Fatina.tween(camera.rotation)
                            .to({y: (player.orientation + 1) * Math.PI / 2}, 250)
                            .onComplete(() => {
                                player.orientation = next;
                                camera.rotation.y = player.orientation * Math.PI / 2
                            })
                            .start();
                        break;
                }
            }));

            scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
            scene.fogStart = 3.0;
            scene.fogEnd = 25.0;
            scene.fogDensity = 0.04;
            scene.fogColor = new BABYLON.Color3(0.1, 0.1, 0.1);

            // Return the created scene
            return scene;
        }

        // call the createScene function
        var scene = createScene();

        // run the render loop
        engine.runRenderLoop(() => scene.render());

        

        // the canvas/window resize event handler
        window.addEventListener('resize', () => engine.resize());
        window.addEventListener('load', () => engine.resize());
    }

    render() {
      return (
        <div id="renderContainer" className={styles.container}></div>
      );
    }
  }
  
  export default Game;