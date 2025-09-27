System.register("chunks:///_virtual/Balloon.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, LabelComponent, SpriteComponent, SpriteFrame, AudioClip, AudioSource, Node, Animation, Vec3, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
      SpriteFrame = module.SpriteFrame;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      Node = module.Node;
      Animation = module.Animation;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

      cclegacy._RF.push({}, "b708dzIjrVF+ahEnnn/kUeh", "Balloon", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Balloon = exports('Balloon', (_dec = ccclass('Balloon'), _dec2 = property(Color), _dec3 = property(LabelComponent), _dec4 = property(SpriteComponent), _dec5 = property([SpriteFrame]), _dec6 = property(AudioClip), _dec7 = property(AudioSource), _dec8 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Balloon, _Component);

        function Balloon() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "minScale", _descriptor, _assertThisInitialized(_this)); // 最小缩放比例


          _initializerDefineProperty(_this, "maxScale", _descriptor2, _assertThisInitialized(_this)); // 最大缩放比例


          _initializerDefineProperty(_this, "minRotationSpeed", _descriptor3, _assertThisInitialized(_this)); //旋转速度


          _initializerDefineProperty(_this, "maxRotationSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "colors", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "label", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "balloonSprite", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrames", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "clip", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioSource", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "balloonParticle", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spawnTime", _descriptor12, _assertThisInitialized(_this)); // 气球生成的时间戳
          // 添加一个属性来存储原始的缩放比例


          _this.originalScale = new Vec3();
          _this._rotationDirection = 1; // 旋转方向，默认为正向

          _this.difficulty = 1; // 从 GameController 获取难度等级

          _this.rotationSpeed = 1;
          return _this;
        }

        var _proto = Balloon.prototype; //

        _proto.onLoad = function onLoad() {
          this.node.setScale(0, 0); // 初始化时设置 scale 为 0
          // 将组件赋到全局变量 _audioSource 中
          //随机形状

          this.setRandomSpriteFrame(); // 随机设置气球颜色

          this.setRandomColor(); // 随机设置旋转方向

          this.setRandomRotationDirection(); // 根据难度调整旋转速度
        };

        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_START, this.onBalloonClicked, this); // 添加鼠标悬浮事件监听：在 onLoad 方法中为气球节点添加鼠标悬浮和离开事件的监听器。
        };

        _proto.update = function update(deltaTime) {
          // 在每帧更新时调用
          this.rotateBalloon(deltaTime);
        };

        _proto.rotateBalloon = function rotateBalloon(deltaTime) {
          // 根据旋转速度计算每帧需要旋转的角度，并考虑旋转方向
          var rotateAngle = this.rotationSpeed * deltaTime * this._rotationDirection; // 每帧绕 Z 轴旋转一定角度

          this.node.angle += rotateAngle;
        };

        _proto.playOneShot = function playOneShot() {
          this.audioSource.playOneShot(this.clip, 1);
        };

        _proto.onBalloonClicked = function onBalloonClicked(event) {
          this.playOneShot();
          this.applyElasticDeformation(); // 播放爆炸动画

          var animation = this.getComponent(Animation);

          if (animation) {
            // 确保动画组件存在
            animation.once(Animation.EventType.FINISHED, this.onAnimationFinished, this); // 监听动画结束事件

            animation.play('BalloonExplode'); // 播放爆炸动画
          } else {
            // 如果没有动画组件，直接销毁节点
            this.node.destroy();
          }
        };

        _proto.onAnimationFinished = function onAnimationFinished() {
          // 动画播放完毕，销毁气球
          this.node.destroy();
        } // 随机生成气球数字
        ;

        _proto.setNumber = function setNumber(number, spawnTime) {
          this.spawnTime = spawnTime; // 记录生成时间

          if (this.label) {
            this.label.string = number.toString();
          }
        };

        _proto.setUniqueScale = function setUniqueScale(scale) {
          // 设置随机大小
          // 将单一的缩放值转换为Vec3
          var targetScale = new Vec3(scale, scale, scale); // 使用Tween动画平滑缩放到目标大小

          tween(this.node).to(1, {
            scale: targetScale
          }, {
            easing: 'quartOut'
          }) // 缓慢增长到目标大小
          .start(); // 开始执行Tween动画
        };

        _proto.setRandomShowEffect = function setRandomShowEffect(scale) {
          // 设置随机显示例子
          this.balloonParticle.active = false;
        };

        _proto.setRandomSpriteFrame = function setRandomSpriteFrame() {
          if (this.spriteFrames.length > 0) {
            // 随机选择一个精灵帧
            var randomIndex = Math.floor(Math.random() * this.spriteFrames.length);
            var randomSpriteFrame = this.spriteFrames[randomIndex]; // 获取 SpriteComponent 并应用精灵帧

            var spriteComponent = this.node.getComponent(SpriteComponent);

            if (spriteComponent) {
              spriteComponent.spriteFrame = randomSpriteFrame;
            }
          } else {
            console.warn("No sprite frames defined in the spriteFrames array.");
          }
        };

        _proto.getScaleSize = function getScaleSize() {
          // 假设x和y的缩放值相同，只返回其中一个即可
          return this.node.scale.x;
        };

        _proto.setRandomColor = function setRandomColor() {
          if (this.colors.length > 0) {
            // 随机选择一个颜色索引
            var randomIndex = Math.floor(Math.random() * this.colors.length);
            var randomColor = this.colors[randomIndex]; // 应用颜色到气球精灵

            if (this.balloonSprite) {
              // console.log("应用颜色", randomColor);
              this.balloonSprite.color = randomColor;
            }
          } else {
            console.warn("No colors defined in the colors array.");
          }
        };

        _proto.applyElasticDeformation = function applyElasticDeformation() {
          var _this2 = this; // 点击爆炸的时候 瞬间变大的效果动画


          var targetScale = new Vec3(this.node.scale.x * 1.5, this.node.scale.y * 1.5, 1); // 比例增加10%

          tween(this.node).to(0.1, {
            scale: targetScale
          }, {
            easing: 'quartOut'
          }) // 快速放大
          .call(function () {
            // 在缩小之前存储原始的缩放比例
            _this2.originalScale.set(_this2.node.scale);
          }).to(0.1, {
            scale: this.originalScale
          }, {
            easing: 'quartOut'
          }) // 恢复到原始比例
          .start();
        };

        _proto.getRandomScale = function getRandomScale() {
          // 此方法应返回一个 Vec3 对象，代表随机的缩放比例
          var randomScaleValue = Math.random() * (this.maxScale - this.minScale) + this.minScale; // console.log("缩放比例", randomScaleValue);

          return new Vec3(randomScaleValue, randomScaleValue, 1); // 假设这是2D游戏，Z轴scale保持1
        };

        _proto.setRandomRotationDirection = function setRandomRotationDirection() {
          // 随机选择旋转方向，1 代表正向，-1 代表反向
          this._rotationDirection = Math.random() < 0.5 ? 1 : -1; // console.log("旋转方向", this._rotationDirection);
        };

        _proto.adjustRotationSpeedByDifficultyConfig = function adjustRotationSpeedByDifficultyConfig(minRotationSpeedMultiplier, maxRotationSpeedMultiplier) {
          // 首先，根据提供的最小和最大倍数计算一个随机的速度倍数
          var speedMultiplier = Math.random() * (maxRotationSpeedMultiplier - minRotationSpeedMultiplier) + minRotationSpeedMultiplier; // 然后，计算实际的旋转速度
          // 假设 this.minRotationSpeed 和 this.maxRotationSpeed 定义了气球的基础旋转速度范围
          // 我们将基础速度（基于最小和最大速度的随机值）乘以计算出的速度倍数，以获得最终旋转速度

          this.rotationSpeed = Math.random() * (this.maxRotationSpeed - this.minRotationSpeed) + this.minRotationSpeed;
          this.rotationSpeed *= speedMultiplier;
        };

        return Balloon;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "minScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "minRotationSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxRotationSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "colors", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "balloonSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "balloonParticle", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "spawnTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DifficultyConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fed43PEmG9OSpk0IBnCUg3Q", "DifficultyConfig", undefined); // DifficultyConfig.ts 难度系统


      var difficultyConfig = exports('difficultyConfig', {
        kindergarten: {
          name: "幼儿",
          numberRange: [1, 10],
          maxBalloons: 3,
          rotationSpeedMultiplierRange: [1, 1.2],
          scoreIncrement: 6,
          // 
          requiredScore: 50,
          // 
          gameTime: 15,
          // 
          gameModes: {
            gameMode: ['NUM'],
            sortOrder: ['ASC']
          }
        },
        primary: {
          name: "小学",
          numberRange: [1, 20],
          maxBalloons: 3,
          rotationSpeedMultiplierRange: [1, 1.5],
          scoreIncrement: 7,
          //21
          requiredScore: 70,
          // 示例值
          gameTime: 15,
          // 示例值
          gameModes: {
            gameMode: ['NUM'],
            sortOrder: ['ASC', 'DESC']
          }
        },
        juniorHigh: {
          name: "初中",
          numberRange: [1, 10],
          maxBalloons: 4,
          rotationSpeedMultiplierRange: [1, 2],
          scoreIncrement: 8,
          //32
          requiredScore: 80,
          // 示例值
          gameTime: 30,
          // 示例值
          gameModes: {
            gameMode: ['SIZE', 'NUM'],
            sortOrder: ['ASC']
          }
        },
        highSchool: {
          name: "高中",
          numberRange: [-10, 10],
          maxBalloons: 5,
          rotationSpeedMultiplierRange: [1, 2.5],
          scoreIncrement: 8,
          //45
          requiredScore: 100,
          // 示例值
          gameTime: 30,
          // 示例值
          gameModes: {
            gameMode: ['SIZE', 'NUM'],
            sortOrder: ['ASC', 'DESC']
          }
        },
        college: {
          name: "大学",
          numberRange: [-20, 20],
          maxBalloons: 4,
          rotationSpeedMultiplierRange: [1, 2.5],
          scoreIncrement: 9,
          //
          requiredScore: 120,
          // 示例值
          gameTime: 35,
          // 示例值
          gameModes: {
            gameMode: ['SIZE', 'NUM'],
            sortOrder: ['ASC', 'DESC']
          }
        },
        graduate: {
          name: "研究生",
          numberRange: [-30, 50],
          // 这里可能需要调整
          maxBalloons: 5,
          rotationSpeedMultiplierRange: [2, 3],
          scoreIncrement: 9,
          requiredScore: 150,
          // 示例值
          gameTime: 50,
          // 示例值
          gameModes: {
            gameMode: ['NUM', 'SIZE'],
            sortOrder: ['ASC', 'DESC']
          } // 由于研究生难度中包含分数，可能还需要其他属性来支持

        },
        phd: {
          name: "博士",
          numberRange: [-99, 99],
          maxBalloons: 5,
          rotationSpeedMultiplierRange: [2, 3],
          scoreIncrement: 10,
          requiredScore: 200,
          // 示例值
          gameTime: 50,
          // 示例值
          gameModes: {
            gameMode: ['NUM', 'SIZE'],
            sortOrder: ['ASC', 'DESC']
          } // 与研究生类似，考虑到都是分数，可能需要其他属性

        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Balloon.ts', './DifficultyConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, AudioSource, AudioClip, Label, Button, Animation, UITransform, Vec3, instantiate, Component, Balloon, difficultyConfig;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      AudioSource = module.AudioSource;
      AudioClip = module.AudioClip;
      Label = module.Label;
      Button = module.Button;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Balloon = module.Balloon;
    }, function (module) {
      difficultyConfig = module.difficultyConfig;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38;

      cclegacy._RF.push({}, "71da6Oca8BLTp960GzrAX9/", "GameController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameController = exports('GameController', (_dec = ccclass('GameController'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(AudioSource), _dec5 = property(AudioClip), _dec6 = property(AudioClip), _dec7 = property(AudioClip), _dec8 = property(AudioClip), _dec9 = property(AudioClip), _dec10 = property(AudioClip), _dec11 = property(AudioClip), _dec12 = property(AudioClip), _dec13 = property(Node), _dec14 = property(Node), _dec15 = property(Node), _dec16 = property(Node), _dec17 = property(AudioClip), _dec18 = property(AudioClip), _dec19 = property(AudioClip), _dec20 = property(Label), _dec21 = property(Label), _dec22 = property(Label), _dec23 = property(Label), _dec24 = property(Label), _dec25 = property(Node), _dec26 = property(Node), _dec27 = property(Node), _dec28 = property(Button), _dec29 = property(Button), _dec30 = property(Button), _dec31 = property(Label), _dec32 = property(Label), _dec33 = property(Label), _dec34 = property(Label), _dec35 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameController, _Component);

        function GameController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "balloonPrefab", _descriptor, _assertThisInitialized(_this)); // 气球的 Prefab


          _initializerDefineProperty(_this, "playArea", _descriptor2, _assertThisInitialized(_this)); // 游戏区域节点


          _initializerDefineProperty(_this, "audioSource", _descriptor3, _assertThisInitialized(_this)); // 用于播放一次性音效的AudioSource


          _initializerDefineProperty(_this, "correctSound", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "wrongSound", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "appearSound", _descriptor6, _assertThisInitialized(_this)); //气球出现的音效


          _initializerDefineProperty(_this, "scoreSoundUp", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreSoundDown", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timeOverSound", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timeOverDingSound", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bilingDingSound", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameOverUI", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetScoreUI", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playingGameUI", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "menuUI", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "levelUpSound", _descriptor16, _assertThisInitialized(_this)); // 等级提升音效


          _initializerDefineProperty(_this, "levelUpVocalSound", _descriptor17, _assertThisInitialized(_this)); // 等级提升女生音效


          _initializerDefineProperty(_this, "levelDownSound", _descriptor18, _assertThisInitialized(_this)); // 等级降低音效


          _initializerDefineProperty(_this, "levelChangeLabel", _descriptor19, _assertThisInitialized(_this)); // 显示等级变化的文本Label


          _initializerDefineProperty(_this, "nextLevelInfoLabel", _descriptor20, _assertThisInitialized(_this)); // 显示距离下一关还需多少分的Label


          _initializerDefineProperty(_this, "ganmeOverTitleLabel", _descriptor21, _assertThisInitialized(_this)); // 游戏闯关结束结算的时候展示的文本  


          _initializerDefineProperty(_this, "nextLevelInfoNumLabel", _descriptor22, _assertThisInitialized(_this)); // 显示距离下一关还需多少分的Num Label


          _initializerDefineProperty(_this, "targetScoreLabel", _descriptor23, _assertThisInitialized(_this)); // 显示通关所需下一关还需多少分的Num Label


          _initializerDefineProperty(_this, "levelChangeUI", _descriptor24, _assertThisInitialized(_this)); //


          _initializerDefineProperty(_this, "correctImage", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "wrongImage", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startGameButton", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "restartGameButton", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "risenGameButton", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "countDownLabel", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreLabel", _descriptor31, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "currentLevelLabel", _descriptor32, _assertThisInitialized(_this));

          _this.currentLevelString = null;
          _this.originLevelString = null;

          _initializerDefineProperty(_this, "gameOverScoreLabel", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameModeLabel", _descriptor34, _assertThisInitialized(_this)); // 游戏模式/题目标签


          _this.gameMode = 'NUM'; // 默认为从小到大模式

          _this.sortOrder = 'ASC'; // 默认为从小到大模式
          // @property

          _this.maxBalloons = 5; // 最大气球数量

          _initializerDefineProperty(_this, "minScale", _descriptor35, _assertThisInitialized(_this)); // 最小缩放比例


          _initializerDefineProperty(_this, "maxScale", _descriptor36, _assertThisInitialized(_this)); // 最大缩放比例
          // @property


          _this.maxRadius = 0.1; //气球最大半径 用于计算生成气球的坐标要在游戏区域里

          _initializerDefineProperty(_this, "totalTime", _descriptor37, _assertThisInitialized(_this)); // 游戏时间时间


          _initializerDefineProperty(_this, "defaultDifficultyKey", _descriptor38, _assertThisInitialized(_this)); // 默认游戏难度


          _this.currentTime = 0; // 当前花费时间

          _this.sortedNumbers = []; // 存储生成的随机数字数组
          // 存储已生成气球大小的列表

          _this.generatedScales = [];
          _this.nextIndex = 0; // 索引，用于跟踪下一个正确的数字

          _this.levelChangeUIAnimation = null; //

          _this.flexibilityScore = 0; // 玩家的灵活度得分

          _this.originScore = 0; //

          _this.numbersToSpawn = []; // 存储将要生成的数字

          _this.nextCorrectNumber = null; // 下一个正确的数字

          _this.isGameOver = false; // 游戏是否结束

          _this.currentDifficultyLevel = void 0;
          return _this;
        }

        var _proto = GameController.prototype; // 当前难度级别

        _proto.start = function start() {
          this.levelChangeUIAnimation = this.levelChangeUI.getComponent(Animation);
          this.menuUI.active = true;
          this.gameOverUI.active = false;
          this.playingGameUI.active = false;
          this.startGameButton.node.on(Node.EventType.TOUCH_START, this.startGame, this);
          this.restartGameButton.node.on(Node.EventType.TOUCH_START, this.restartGame, this);
          this.risenGameButton.node.on(Node.EventType.TOUCH_START, this.startGame, this);
        };

        _proto.setDifficulty = function setDifficulty(level) {
          this.currentDifficultyLevel = difficultyConfig[level];
          console.log(this.currentDifficultyLevel, JSON.stringify(this.currentDifficultyLevel));
          this.maxBalloons = this.currentDifficultyLevel.maxBalloons;
          console.log("当前游戏level", JSON.stringify(this.currentDifficultyLevel));
        };

        _proto.restartGame = function restartGame() {
          var levelKeys = Object.keys(difficultyConfig);
          this.defaultDifficultyKey = levelKeys[0];
          console.log("restartGame defaultDifficultyKey=", this.defaultDifficultyKey);
          this.startGame();
        };

        _proto.startGame = function startGame() {
          // 设置默认难度级别
          this.setDifficulty(this.defaultDifficultyKey);
          this.menuUI.active = false;
          this.playingGameUI.active = true;
          this.gameOverUI.active = false; // 确保开始游戏时隐藏游戏结束UI

          this.showTargetScoreUI();
        };

        _proto.showTargetScoreUI = function showTargetScoreUI() {
          var _this2 = this;

          this.targetScoreUI.active = true;
          this.targetScoreLabel.string = this.currentDifficultyLevel.requiredScore.toString();
          this.scheduleOnce(function () {
            _this2.beginGame();
          }, 3); // 给用户一点时间看提示图片
        };

        _proto.beginGame = function beginGame() {
          this.targetScoreUI.active = false;
          this.audioSource.play();
          this.currentTime = this.totalTime; // 从当前难度级别配置中读取游戏时间和模式

          this.currentTime = this.currentDifficultyLevel.gameTime;
          this.countDownLabel.string = this.currentTime.toString();
          this.selectRandomGameMode();
          this.flexibilityScore = 0;
          this.scoreLabel.string = this.flexibilityScore.toString();
          this.currentLevelString = difficultyConfig[this.defaultDifficultyKey].name;
          this.levelChangeLabel.string = this.currentLevelString;
          this.schedule(this.updateTimer, 1); // 随机选择游戏模式并更新题目
          // this.updateGameMode();

          this.spawnBalloons();
        };

        _proto.selectRandomGameMode = function selectRandomGameMode() {
          // 设置默认游戏模式（可根据需求调整）
          // 从当前难度级别的配置中随机选择游戏模式和排序方式
          var gameModeOptions = this.currentDifficultyLevel.gameModes.gameMode;
          var sortOrderOptions = this.currentDifficultyLevel.gameModes.sortOrder;
          this.gameMode = gameModeOptions[Math.floor(Math.random() * gameModeOptions.length)];
          this.sortOrder = sortOrderOptions[Math.floor(Math.random() * sortOrderOptions.length)]; // 更新游戏模式描述

          this.updateGameModeLabel();
        } // 假设的 moveToNextLevel 方法，用于更新到下一个难度级别
        ;

        _proto.moveToNextLevel = function moveToNextLevel() {
          var levelKeys = Object.keys(difficultyConfig);
          var currentIndex = levelKeys.indexOf(this.defaultDifficultyKey);
          var nextIndex = currentIndex + 1;

          if (nextIndex < levelKeys.length) {
            // 存在下一个难度级别，更新难度并重新开始游戏
            this.defaultDifficultyKey = levelKeys[nextIndex];
            console.log("更新到下一个难度级别", this.defaultDifficultyKey);
            this.setDifficulty(this.defaultDifficultyKey); // 重置游戏状态以准备新的难度级别
            // 自动开始新难度级别的游戏
            // 隐藏GameOverUI并开始下一关

            this.audioSource.playOneShot(this.levelUpSound, 1); // 播放升级音效

            this.resetGameState();
            this.startGame();
          } else {
            // 玩家通关了所有的难度级别，展示游戏通关逻辑
            console.log("恭喜你完成了所有难度级别！"); // 可以在这里处理游戏通关的逻辑，例如展示一个通关的界面

            this.showGameCompletionUI();
          }
        };

        _proto.showGameCompletionUI = function showGameCompletionUI() {// 展示游戏通关界面的逻辑
          // 例如，使游戏通关的UI元素可见
          // this.gameCompletionUI.active = true; // 假设你有一个游戏通关的UI节点命名为gameCompletionUI
          // 可以在这里播放通关音效
          // this.audioSource.playOneShot(this.gameCompletionSound, 1);
          // 可能还想要展示一些通关的信息，比如玩家的总分数、用时等
          // this.finalScoreLabel.string = `总分数: ${this.flexibilityScore}`; // 假设你有一个显示总分数的Label命名为finalScoreLabel
        };

        _proto.resetGameState = function resetGameState() {
          // 重置游戏状态的逻辑
          // 重置分数、计时器等
          this.flexibilityScore = 0;
          this.scoreLabel.string = '0'; // 重置其他需要的游戏状态和变量...
        };

        _proto.updateGameModeLabel = function updateGameModeLabel() {
          var modeDescription = ""; // 游戏模式的描述

          if (this.gameMode === 'NUM') {
            modeDescription += "数字";
          } else if (this.gameMode === 'SIZE') {
            modeDescription += "气球";
          }

          modeDescription += this.sortOrder === 'ASC' ? "从小到大点击" : "从大到小点击";
          this.gameModeLabel.string = modeDescription;
        };

        _proto.updateGameMode = function updateGameMode() {
          var modes = ["数字从小到大点击", "数字从大到小点击", "气球从小到大点击", "气球从大到小点击"];
          var selectedMode = modes[Math.floor(Math.random() * modes.length)];
          this.gameModeLabel.string = selectedMode; // 初始化gameMode和sortOrder

          var gameMode = 'NUM'; // 默认为数字模式

          var sortOrder = 'ASC'; // 默认为升序
          // 解析选择的模式，设置gameMode和sortOrder

          if (selectedMode.includes("气球")) {
            gameMode = 'SIZE'; // 设置为基于大小的模式
          }

          if (selectedMode.includes("大到小")) {
            sortOrder = 'DESC'; // 设置为降序
          } // 更新属性


          this.gameMode = gameMode;
          this.sortOrder = sortOrder; // 反馈给开发者或测试者看到的更新

          console.log("\u6E38\u620F\u6A21\u5F0F" + selectedMode);
        };

        _proto.updateTimer = function updateTimer() {
          this.currentTime -= 1;

          if (this.currentTime <= 10 && this.currentTime > 0) {
            //倒计时音乐
            if (this.audioSource && this.timeOverSound) {
              this.audioSource.playOneShot(this.timeOverSound, 1); // 播放倒计时音效
            }
          }

          if (this.countDownLabel) {
            //倒计时秒针数字
            this.countDownLabel.string = this.currentTime.toString();
          }

          if (this.currentTime <= 0) {
            this.unschedule(this.updateTimer);

            if (this.audioSource && this.timeOverDingSound) {
              this.audioSource.playOneShot(this.timeOverDingSound, 1); // 播放倒计时叮音效
            }

            this.gameOver();
          }
        };

        _proto.gameOver = function gameOver() {
          var _this3 = this;

          console.log("game over");
          this.destroyAllBalloons(); // 销毁所有气球

          this.isGameOver = true;
          this.playingGameUI.active = false;
          this.gameOverUI.active = true;
          this.gameOverScoreLabel.string = this.originScore.toString(); // console.log("currentLevelString", this.currentLevelString);

          this.currentLevelLabel.string = this.currentLevelString;
          this.audioSource.stop();
          this.scheduleOnce(function () {
            _this3.updateGameOverUIScore();
          }, 0.5); // 给用户一点时间看提示图片

          if (this.audioSource && this.timeOverDingSound) {
            this.audioSource.playOneShot(this.timeOverDingSound, 1); // 播放倒计时结束音效
          }

          var scoreNeededForNextLevel = this.currentDifficultyLevel.requiredScore - this.flexibilityScore;

          if (scoreNeededForNextLevel > 0) {
            var soundClip = this.scoreSoundDown;

            if (soundClip) {
              this.audioSource.playOneShot(this.scoreSoundUp, 0.3); // 播放正确或错误的音效
            }

            this.restartGameButton.node.active = true; // 使重新开始游戏按钮不可见

            this.risenGameButton.node.active = true; // 使复活按钮不可见

            this.nextLevelInfoLabel.node.active = true; // 可选：隐藏显示距离下一关还需多少分的标签

            this.nextLevelInfoNumLabel.node.active = true; // 同上
            // 玩家未能成功通关

            this.ganmeOverTitleLabel.string = "闯关失败";
            this.nextLevelInfoLabel.string = "距离下一级还需";
            this.nextLevelInfoNumLabel.string = scoreNeededForNextLevel.toString();
          } else {
            this.restartGameButton.node.active = false; // 使重新开始游戏按钮不可见

            this.risenGameButton.node.active = false; // 使复活按钮不可见

            this.nextLevelInfoLabel.node.active = false; // 可选：隐藏显示距离下一关还需多少分的标签

            this.nextLevelInfoNumLabel.node.active = false; // 同上
            // 短暂展示结算界面后，播放升级音效，并自动升级难度

            this.scheduleOnce(function () {
              _this3.moveToNextLevel(); // 自动升级到下一关

            }, 3); // 这里的3秒是展示结算界面的时间，可根据需要调整
            // 如果玩家分数超过了通关分数，可以选择隐藏这个Label或者显示一个积极的消息

            this.ganmeOverTitleLabel.string = "闯关成功";
            this.scheduleOnce(function () {
              // const animation = this.gameOverUI.getComponent(Animation);
              // if (animation) {
              //     animation.play('GameOverUILeave');
              // }
              _this3.audioSource.playOneShot(_this3.levelUpVocalSound, 1); // 播放正确或错误的音效

            }, 4); // 给用户一点时间看提示图片 
            // 播放数字变大的动画
          }
        };

        _proto.restartSpawnBalloons = function restartSpawnBalloons() {
          // 重新生成气球
          this.destroyAllBalloons(); // 销毁所有气球

          this.nextIndex = 0;
          this.selectRandomGameMode();
          this.spawnBalloons(); // 可能还需要重置其他相关状态，比如灵活度得分等
        };

        _proto.generateUniqueScale = function generateUniqueScale() {
          // 生成一个在minScale和maxScale之间的唯一缩放值：
          var uniqueScale;
          var scaleRange = this.maxScale - this.minScale;
          var minAllowedDifference = 0.1; // 设定最小区别值以确保大小可辨识

          do {
            uniqueScale = Math.random() * scaleRange + this.minScale; // 保证生成的大小是唯一且可辨识的
          } while (this.generatedScales.some(function (scale) {
            return Math.abs(scale - uniqueScale) < minAllowedDifference;
          }));

          return uniqueScale;
        };

        _proto.getRandomPosition = function getRandomPosition() {
          var playAreaTransform = this.playArea.getComponent(UITransform);

          if (!playAreaTransform) {
            console.error("playArea lacks a UITransformComponent!");
            return new Vec3(0, 0, 0);
          }

          var playAreaWidth = playAreaTransform.width;
          var playAreaHeight = playAreaTransform.height; // 为了确保气球不会超出PlayArea，需要考虑气球的maxRadius
          // 生成随机位置时，考虑到maxRadius确保气球完全在PlayArea内

          var x = Math.random() * (playAreaWidth - this.maxRadius * 2) + this.maxRadius - playAreaWidth / 2;
          var y = Math.random() * (playAreaHeight - this.maxRadius * 2) + this.maxRadius - playAreaHeight / 2;
          return new Vec3(x, y, 0);
        };

        _proto.generateSortedRandomNumbers = function generateSortedRandomNumbers(count) {
          // 生成气球数组
          var numbers = new Set();
          var numberRange = this.currentDifficultyLevel.numberRange;
          var rangeStart = numberRange[0],
              rangeEnd = numberRange[1];

          while (numbers.size < count) {
            var num = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
            numbers.add(num);
          }

          return Array.from(numbers).sort(function (a, b) {
            return a - b;
          });
        };

        _proto.spawnBalloons = function spawnBalloons() {
          var _this4 = this; // 气球生成


          this.destroyAllBalloons(); // 销毁所有气球

          this.sortedNumbers = this.generateSortedRandomNumbers(this.maxBalloons); // 示例：生成5个数字，难度为4

          this.generatedScales = []; // 重置已生成的缩放大小列表

          var rotationSpeedMultiplierRange = this.currentDifficultyLevel.rotationSpeedMultiplierRange;
          var minRotationSpeedMultiplier = rotationSpeedMultiplierRange[0],
              maxRotationSpeedMultiplier = rotationSpeedMultiplierRange[1];
          var spawnTime = Date.now(); // 获取当前时间戳

          this.sortedNumbers.forEach(function (number) {
            var balloon = instantiate(_this4.balloonPrefab);

            _this4.playArea.addChild(balloon);

            var uniqueScale = _this4.generateUniqueScale();

            _this4.generatedScales.push(uniqueScale); // console.log(`数字${number}的气球大小`, uniqueScale)


            balloon.setPosition(_this4.getRandomPosition()); // 设置气球数字

            var balloonScript = balloon.getComponent(Balloon);

            if (balloonScript) {
              balloonScript.setUniqueScale(uniqueScale); // // 调用修改后的方法，并传递生成的唯一大小

              balloonScript.setNumber(number, spawnTime); // 传入数字以及生成时间
              // 根据当前游戏难度调整旋转速度

              balloonScript.adjustRotationSpeedByDifficultyConfig(minRotationSpeedMultiplier, maxRotationSpeedMultiplier);
            }

            balloon.on(Node.EventType.TOUCH_START, function () {
              return _this4.checkBalloon(number, uniqueScale, balloonScript.spawnTime);
            }, _this4);
          });

          if (this.audioSource && this.appearSound) {
            this.audioSource.playOneShot(this.appearSound, 1); // 播放出现音效
          }

          this.generatedScales = Array.from(this.generatedScales).sort(function (a, b) {
            return a - b;
          }); // 默认升序

          console.log("气球数字大小数组：", this.sortedNumbers);
          console.log("气球大小数组：", this.generatedScales);
        };

        _proto.checkBalloon = function checkBalloon(clickedNumber, clickedScale, spawnTime) {
          var _this5 = this; // console.log("点击的时候的分数为", this.flexibilityScore)


          var clickTime = Date.now();
          var elapsedTime = (clickTime - spawnTime) / 1000; // 计算响应时间（秒）
          // console.log('响应时间，', elapsedTime)

          var isCorrect = false;

          if (this.gameMode === 'NUM') {
            // 处理数字模式的逻辑
            if (this.sortOrder === 'ASC') {
              isCorrect = this.sortedNumbers[this.nextIndex] === clickedNumber;
            } else {
              // 'descending'
              isCorrect = this.sortedNumbers[this.sortedNumbers.length - 1 - this.nextIndex] === clickedNumber;
            }
          } else if (this.gameMode === 'SIZE') {
            // 处理气球大小模式的逻辑
            // 需要确定clickedScale与expectedScale的比较逻辑
            var expectedScale = this.sortOrder === 'ASC' ? this.generatedScales[this.nextIndex] : this.generatedScales[this.generatedScales.length - 1 - this.nextIndex];
            console.log('期望的大小，点击的大小：', expectedScale, clickedScale);
            isCorrect = clickedScale === expectedScale;
          }

          if (isCorrect) {
            console.log("点击正确!", clickedNumber);
            this.updateScore(true, elapsedTime);
            this.nextIndex++; // 移动到下一个数字

            if (this.nextIndex >= this.sortedNumbers.length) {
              console.log("全部正确，下一关");

              if (this.audioSource && this.correctSound) {
                this.audioSource.playOneShot(this.correctSound, 1); // 播放正确音效

                this.showCheckImage(true); // 显示正确图片并重启游戏
                // 延迟重启游戏

                this.scheduleOnce(function () {
                  _this5.restartSpawnBalloons();
                }, 0.3); // 给用户一点时间看提示图片
              }
            }
          } else {
            console.log("点击错误", clickedNumber);
            this.updateScore(false, elapsedTime); // 点击错误的逻辑...

            if (this.audioSource && this.wrongSound) {
              this.audioSource.playOneShot(this.wrongSound, 1); // 播放错误音效
            }

            this.showCheckImage(false); // 显示错误图片

            this.scheduleOnce(function () {
              _this5.restartSpawnBalloons();
            }, 0.3); // 给用户一点时间看提示图片
          }
        };

        _proto.updateGameOverUIScore = function updateGameOverUIScore() {
          var _this6 = this; // 结算界面得分增加动画 每次增加的数根据总分步长不一样


          var gameOverScoreNumber = 0;
          var incrementStep = 1;

          if (this.flexibilityScore >= 30 && this.flexibilityScore < 100) {
            incrementStep = 3;
          } else if (this.flexibilityScore >= 100 && this.flexibilityScore < 300) {
            incrementStep = 5;
          } else if (this.flexibilityScore >= 300 && this.flexibilityScore < 600) {
            incrementStep = 7;
          } else if (this.flexibilityScore >= 600) {
            incrementStep = 11;
          }

          var totalSteps = Math.ceil(this.flexibilityScore / incrementStep);
          var currentStep = 0;
          var animation = this.gameOverScoreLabel.getComponent(Animation); // 播放数字变大的动画

          if (animation) {
            animation.play('ScoreNumberPop');
          }

          var intervalDuration = 2000 / totalSteps; // 根据总步数计算每步的时间间隔

          var timer = setInterval(function () {
            if (currentStep < totalSteps) {
              currentStep++;
              gameOverScoreNumber += incrementStep;

              if (_this6.scoreSoundUp && _this6.scoreSoundUp) {
                _this6.audioSource.playOneShot(_this6.scoreSoundUp, 0.3);
              }

              _this6.gameOverScoreLabel.string = gameOverScoreNumber.toString();
            } else {
              clearInterval(timer);

              if (_this6.flexibilityScore !== gameOverScoreNumber) {
                gameOverScoreNumber = _this6.flexibilityScore;
                _this6.gameOverScoreLabel.string = gameOverScoreNumber.toString();
              }
            }
          }, intervalDuration); // 使用计算得到的时间间隔
        } // 在checkBalloon方法中更新灵活度得分
        ;

        _proto.updateScore = function updateScore(isCorrect, elapsedTime) {
          var _this7 = this;

          if (elapsedTime === void 0) {
            elapsedTime = 0;
          } // 在更新分数之前保存旧等级名


          var oldLevelName = this.currentDifficultyLevel.name; // 从当前难度级别获取得分增量

          var scoreIncrement = this.currentDifficultyLevel.scoreIncrement; // console.log("当前难度基础分=" + scoreIncrement)

          var timeAdjustedScoreIncrement = this.calculateTimeAdjustedScoreIncrement(elapsedTime, scoreIncrement); // console.log("点击时间调整后得分=" + timeAdjustedScoreIncrement)
          // 确定分数的变化方向，正确增加分，错误减少双倍分

          var scoreChange = isCorrect ? timeAdjustedScoreIncrement : -timeAdjustedScoreIncrement * 2; // 如果答错，确保不会减到负分

          if (!isCorrect && this.flexibilityScore + scoreChange < 0) {
            scoreChange = -this.flexibilityScore; // 只减到0
          } // 计划的总步骤数，以及每次更新分数的步进值


          var totalSteps = Math.abs(scoreChange); // 总共需要变化的步数等于分数变化量

          var currentStep = 0; // 播放分数变化动画

          var animation = this.scoreLabel.getComponent(Animation);

          if (animation) {
            animation.play('ScoreNumberPop'); // 假设这是你的分数变化动画
          }

          var intervalDuration = 50; // 每次分数更新间隔时间，可以调整

          var timer = setInterval(function () {
            if (currentStep < totalSteps) {
              _this7.flexibilityScore += isCorrect ? 1 : -1; // 每步根据是正确还是错误增加或减少1分

              _this7.scoreLabel.string = _this7.flexibilityScore.toString();
              currentStep++;
            } else {
              clearInterval(timer); // 完成分数更新，清除计时器
            }
          }, intervalDuration); // 播放对应的音效

          if (this.audioSource) {
            var soundClip = isCorrect ? this.scoreSoundUp : this.scoreSoundDown;

            if (soundClip) {
              this.audioSource.playOneShot(soundClip, 0.3); // 播放正确或错误的音效
            }
          } // // 基于新分数更新难度级别
          // this.updateDifficultyBasedOnScore(this.flexibilityScore, scoreChange);
          // // 在更新难度级别之后，检查等级是否发生变化
          // const newLevelName = this.currentDifficultyLevel.name;
          // if (oldLevelName !== newLevelName) {
          //     // 确定是升级还是降级，并播放相应的声音
          //     // console.log('确定是升级还是降级，并播放相应的声音', oldLevelName, newLevelName)
          //     this.handleLevelChangeFeedback(oldLevelName, newLevelName);
          // }

        } // 计算时间调整后的得分增量
        ;

        _proto.calculateTimeAdjustedScoreIncrement = function calculateTimeAdjustedScoreIncrement(elapsedTime, scoreIncrement) {
          var timeThresholds = [3, 4, 5, 6]; // 时间阈值，单位秒

          var scorePenalties = [0, 1, 2, 3]; // 对应的得分减少值

          var timeAdjustedScoreIncrement = scoreIncrement; // 默认满分
          // 通过时间阈值判断减分

          for (var i = 0; i < timeThresholds.length; i++) {
            if (elapsedTime > timeThresholds[i]) {
              // 递增减分，但保证分数不低于1分
              timeAdjustedScoreIncrement = Math.max(scoreIncrement - scorePenalties[i], 1);
            } else {
              break; // 如果未超过当前时间阈值，直接结束循环
            }
          } // 额外的时间段（超过6秒）


          if (elapsedTime > 6) {
            var extraTime = elapsedTime - 6; // 每额外2秒减1分，但总分不低于1

            var extraPenalty = Math.min(Math.floor(extraTime / 2), scoreIncrement - 1);
            timeAdjustedScoreIncrement = Math.max(scoreIncrement - extraPenalty, 1);
          }

          return timeAdjustedScoreIncrement;
        };

        _proto.handleLevelChangeFeedback = function handleLevelChangeFeedback(oldLevelName, newLevelName) {
          var _this8 = this; // 获取旧等级和新等级在配置中的索引


          var oldIndex = Object.keys(difficultyConfig).findIndex(function (key) {
            return difficultyConfig[key].name === oldLevelName;
          });
          var newIndex = Object.keys(difficultyConfig).findIndex(function (key) {
            return difficultyConfig[key].name === newLevelName;
          }); // 等级变化逻辑...

          if (newIndex > oldIndex) {
            // 等级提升逻辑
            this.audioSource.playOneShot(this.levelUpSound, 1);
            this.scheduleOnce(function () {
              _this8.audioSource.playOneShot(_this8.levelUpVocalSound, 1);
            }, 0.5); // 
          } else if (newIndex < oldIndex) {
            // 等级降低逻辑
            this.audioSource.playOneShot(this.levelDownSound, 1);
          }

          this.levelChangeUIAnimation.play('levelChange'); // 播放升级动画
          // 更新等级显示文本

          this.levelChangeLabel.string = "" + newLevelName;
          this.currentLevelString = newLevelName;
        };

        _proto.showCheckImage = function showCheckImage(isCorrect) {
          var _this9 = this; // 播放正确错误图案


          if (isCorrect) {
            this.correctImage.active = true;
            this.scheduleOnce(function () {
              _this9.correctImage.active = false;
            }, 0.3); // 1秒后隐藏
          } else {
            this.wrongImage.active = true;
            this.scheduleOnce(function () {
              _this9.wrongImage.active = false;
            }, 0.3); // 1秒后隐藏
          }
        };

        _proto.destroyAllBalloons = function destroyAllBalloons() {
          // 遍历 playArea 的所有子节点 
          this.playArea.children.slice().forEach(function (balloon) {
            // 检查节点是否具有 Balloon 组件
            if (balloon.getComponent(Balloon)) {
              // 如果是气球节点，则销毁它
              balloon.destroy();
            }
          });
        };

        return GameController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "balloonPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "correctSound", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wrongSound", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "appearSound", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "scoreSoundUp", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "scoreSoundDown", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "timeOverSound", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "timeOverDingSound", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "bilingDingSound", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "gameOverUI", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "targetScoreUI", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "playingGameUI", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "menuUI", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "levelUpSound", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "levelUpVocalSound", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "levelDownSound", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "levelChangeLabel", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "nextLevelInfoLabel", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "ganmeOverTitleLabel", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "nextLevelInfoNumLabel", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "targetScoreLabel", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "levelChangeUI", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "correctImage", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "wrongImage", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "startGameButton", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "restartGameButton", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "risenGameButton", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "countDownLabel", [_dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "currentLevelLabel", [_dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "gameOverScoreLabel", [_dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "gameModeLabel", [_dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "minScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "maxScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "totalTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "defaultDifficultyKey", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'kindergarten';
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Balloon.ts', './DifficultyConfig.ts', './GameController.ts'], function () {
  return {
    setters: [null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});