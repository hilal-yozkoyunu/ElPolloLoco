const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Endboss()
    ],[
        new Cloud(0),
        new Cloud(700),
        new Cloud(1400),
        new Cloud(1700),
        new Cloud(2000),
        new Cloud(2100),
        new Cloud(2400),
        new Cloud(2700),
        new Cloud(3000),
        new Cloud(3300),
        new Cloud(3600),
        new Cloud(3900),
        new Cloud(4200),
        new Cloud(4500),
        new Cloud(4800),
        new Cloud(5000)
    ],[
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/air.png', 719*5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),

        new BackgroundObject('img/5_background/layers/air.png', 719*6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/air.png', 719*7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
    ],
    [
        new Coin(500, 250),
        new Coin(580, 210),
        new Coin(660, 170),
        new Coin(740, 210),
        new Coin(820, 250),

        new Coin(1500, 250),
        new Coin(1580, 210),
        new Coin(1660, 170),
        new Coin(1740, 210),
        new Coin(1820, 250),

        new Coin(2500, 250),
        new Coin(2580, 210),
        new Coin(2660, 170),
        new Coin(2740, 210),
        new Coin(2820, 250),

        new Coin(3500, 250),
        new Coin(3580, 210),
        new Coin(3660, 170),
        new Coin(3740, 210),
        new Coin(3820, 250),

        new Coin(4500, 250),
        new Coin(4580, 210),
        new Coin(4660, 170),
        new Coin(4740, 210),
        new Coin(4820, 250)
    ],
    [
        new BottlesOnGround(400),
        new BottlesOnGround(500),
        new BottlesOnGround(600),

        new BottlesOnGround(900),
        new BottlesOnGround(1000),

        new BottlesOnGround(1200),
        new BottlesOnGround(1300),
        new BottlesOnGround(1400),

        new BottlesOnGround(1700),
        new BottlesOnGround(1800),

        new BottlesOnGround(2000),
        new BottlesOnGround(2100),
        new BottlesOnGround(2200),

        new BottlesOnGround(2500),
        new BottlesOnGround(2600),

        new BottlesOnGround(2800),
        new BottlesOnGround(2900),
        new BottlesOnGround(3000),

        new BottlesOnGround(3200),
        new BottlesOnGround(3300),

        new BottlesOnGround(3500),
        new BottlesOnGround(3600),
        new BottlesOnGround(3700),

        new BottlesOnGround(4000),
        new BottlesOnGround(4100),

        new BottlesOnGround(4300),
        new BottlesOnGround(4400),
        new BottlesOnGround(4500),

        new BottlesOnGround(4800),
        new BottlesOnGround(4900)
    ]
);