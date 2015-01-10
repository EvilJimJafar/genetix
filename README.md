Genetix
====

Genetix is a lightweight RTS inspired by natural selection and the process of evolution. As the commander of constantly evolving gene pools, you can evolve your minions and discover endless genetic combinations to outwit, kill or manipulate your enemies.

The basic aim of the game is to outperform your opponent(s) by outlasting them or killing them, proving that your unique gene combinations are fit for survival.

## Minions
Minions are formed in gene pools and live to fulfil one destiny only: securing new genetic material for the next generation. They float around on their own accord, sniffing and collecting genes. Once all of a minion's five *gene slots* are filled, they transport them back to the gene pool,unload and repeat the process.

#### Sight radius
Every minion has a sight radius, outside which no other minion activity is registered. As soon as another minion enters its sight radius, the minion’s *basic instinct* is triggered. The sight radius is usually 5px times the size of the minion, but some genes can improve it.

#### Energy
A minion’s energy is determined by it’s stamina, and is used when executing behaviours. Energy is not replenishable, and once a minion runs out of energy, it will consume health instead when executing behaviours.

#### Health
A minion's health is determined by it's size, i.e. Larger minions have more health than smaller minions.

For example, a size 30 minion has 30 health (which means it can take 30 damage before dying).

When a minion's health drops below 20%, it starts to flicker and lose opacity. When it reaches 0%, the minion dies and any genes it was carrying are returned to the ether.

Health regenerates slowly out of combat.

#### Strength
Strength determines how much damage can be dealt in combat and derives from a minion’s size. 

For example, a size 30 minion has 30 strength, which means it deals 10-30 damage in combat. A size 50 minion will deal 10-50, and Size 10 minion will deal 10.

#### Persistence
Persistence, which derives from a minion’s stamina, determines how long it will intimidate, pursue or flee from an enemy. 

For example, a minion with 40 stamina will intimidate, pursue or flee for 3-4 seconds. A minion with 60 stamina will perform for 5-6 seconds.

# Genes
Genes are the life force of Genetix and form the building blocks of new minions. Minions themselves get no direct benefit from collecting genes, however the collected genes will inform all attributes of the next generation of minions and are crucial to surviving the game. 

## Instincts
Active genes define a minion’s three types of instincts: its Basic instinct; its Aggressive instinct and its Defensive instinct.

### Basic instinct
The basic instinct informs a minion’s behaviour as soon as an enemy minion enters its sight radius. 

For example: On sight, *intimidate*. 
(The minion will execute the intimidate behaviour on sight.)

### Aggressive instinct
Aggressive instincts overrides the basic instinct and set attack criteria. Only when all criteria are met does the minion attack.

For example: *Attack* if enemy is < self. 
(The minion will only attack if the enemy is smaller than itself, even if it’s basic instinct is to attack on sight.)

### Defensive instinct
Defensive instincts tell minions what to do when they are being attacked themselves.

For example: When attacked, *flee*.
(If the minion gets attacked at any point, it will flee.)

## Behaviours
Each instinct can contain different behaviours, such as attacking or fleeing from an enemy minion. Executing behaviours cost energy and will eventually deplete a minion’s health.

### Intimidate
When when a minion intimidates another, it slows down and targets the enemy for an uncertain amount of time – defined by the minion’s stamina – before yielding. If two minions are intimidating each other, the minion who yields first is forced to flee, causing it to lose stamina.

Because attacking costs energy, intimidating your enemies can be a very cost effective way of scaring them away.

### Attack
Attacking causes a minion to speed up and pursue the opponent for a duration determined by its stamina. If the attacking minion makes contact with the enemy, delivers it’s combat damage.

Attacking is the fastest way to kill an enemy, but carries huge risk. Defending minions may still deliver combat damage, even if they die in the process.

### Retaliate
A minion who is being attacked may retaliate, which is to say it attacks the attacking enemy. 

When two minions attack each other, they both deal combat damage.

### Flee
The minion will speed up and move away from the enemy for a duration determined by its stamina.

Fleeing costs energy but usually gets you out of trouble and also tires out attacking enemies.

### Hide
Hiding is similar to fleeing in that the minion will try to avoid the enemy, but instead of speeding up, it slows down and its visibility is reduced by 50%.

As hiding does not consume energy, it’s a cost effective way to avoid stronger enemies.

### Hunker
A hunkered minion takes 50% less damage, but also deals no damage in combat.

Hunkering is useful against enemies with low strength and stamina, forcing them to continually attack until their energy is depleted. 

### Inflate
Inflating causes a minion to increase in size for a duration determined by its stamina.

Inflating is useful to trick enemies that only attack minions below a certain size.

## Physical attributes
Active genes carry information about the physical attributes of a minion, declared as follows: Size=n; Speed=n; Stamina=n.

Each attribute can be allocated any number of points, however the total number of points combined is always 100. For example: Size=30; Speed=30; Stamina=40.

### Size
Size determines the physical dimensions of a minion as well as its health and combat strength. A size 30 minion, as in the example above, has both a health and combat strength value of 30.

### Speed
Speed determines the velocity of a minion as well as the rate at which energy is consumed when executing certain behaviours. Minions with a high speed value reach their targets faster, but generally have a shorter life span due to a higher energy consumption rate.

### Stamina
Stamina is the lifeblood of minions, as it determines how much energy a minion has. Every time a behaviour is executed, for example attacking, a little bit of energy is consumed (the rate of which relates to the minion’s speed). When all the energy is consumed, health will be consumed instead and eventually the minion will die.

Stamina also determines how long a minion will persist in a behaviour; for example for how long it will flee from or pursue an enemy.

## Specialisation
Specialisations are extra modifiers or special abilities that make minions stronger (depending on the rest of their genetic make-up, of course).

Example specialisations are:
- Shell (take 90% less damage when hunkered)
- Streamlined (2x stamina)
- Ambush (2x attack if hidden)
- School mentality (+1 speed per nearby friendly minion)
- Pride mentality (+1 attack per nearby friendly minion)
- Pack mentality (+1 stamina per nearby friendly minion)
- Pod mentality (+1 health per nearby friendly minion)
- Spikes (deal combat damage when hunkered)

## Species bonus
Combining five genes with the same colour will yield a species bonus, for example double sight radius, double size or double life span. 

# Gameplay

## Controls
The controls in Genetix are restricted to setting waypoints for minions and informing the genetic makeup of new ones. 

### Setting waypoints
Waypoints are used to send minions to different areas of the map. To set a waypoint, click and hold a gene pool until the desired number of minions has been selected. Click again anywhere on the map to send the minions there. Once a minion reaches a waypoint, it will resume its primary objective of collecting genes.

## Forming new minions
Once a a gene pool contains at least 5 genes, a new minion will be formed automatically. New minions take 3 seconds to spawn and inherit all properties of the genes they are formed from.

### Splicing
In the splice menu, you can decide which genes to splice when forming and queueing up minions. 

As long as there are enough genes (it takes five to create one minion), a new minion will spawn every 3 seconds, using the genes specified in the splice menu. You can also queue up a number of different combinations, provided you have enough genes to do so.

### Gene slots
Each minion has five gene slots:

1. Basic instinct
2. Aggressive instinct
3. Defensive instinct
4. Physique
5. Specialisation

The first three (instincts) determine the behaviour of a minion;  the physique determines size, speed and stamina; and the specialisation slot allows for modifiers or special abilities.

Some genes trigger different effects depending on which gene slot they are used in. These genes are called active genes.

Example active gene:

1. On sight, intimidate.
2. Attack if enemy < self.
3. When attacked, retaliate.
4. Size 6 / Speed 2 / Stamina 2
5. Streamlined (double stamina)

In this example, the active gene could be used to inform either of the five slots, however to gain all of the attributes, five active genes would be required.

## Combat
Basic instincts trigger behaviours as soon as minions enter each others sight radii. If one or more instincts trigger an attack, combat ensues.

The attacker charges the opponent – or they both charge each other – and deals combat damage (defined by size) on impact. Any surviving minions will continue in the direction they were moving during the attack for a short amount of time before their basic instincts can be triggered again. 

This process repeats until either minion is dead or out of sight radius.

## Game modes
### Sandbox (MVP)
Play against a set number of AIs on a large map. Active genes spawn randomly, so both the player and the AIs evolve slowly. Win the game by destroying all enemy minions.

### Puzzle
Play using predetermined minions (with a set combination of genes) to solve puzzles such as:

- Move at least X minions to a particular area
- Survive for X seconds against overwhelming enemies
- Destroy one enemy but not another
- Form a particular species 

### Multiplayer
Similar to sandbox, multiplayer pits at least two players against each other, with or without IAs. Players can choose whether to start with ‘blank’ minions or themed sets of genes.

For further information, a demo, API docs and more, please visit the [Genetix project page](http://jimsangwine.github.com/Genetix) on github

### @TODO: Add a GitHub page?

# Developer documentation

## Directory structure ##

* **source** - Work in here
* **build** - This is where the minified and archived code will be placed
* **test** - Do your Jasmine BDD JavaScript unit testing in here (see [below](#jasmine) for more info)
* **documentation** - This is where your JSDoc3 API docs will be output (see [below](#jsdoc) for more info)


## NodeJS, NPM & Gulp ##

You need to install NodeJS and NPM (Node Package Manager) for your OS: [https://www.google.nl/search?q=install+npm&oq=install+npm] (https://www.google.nl/search?q=install+npm&oq=install+npm)

For Mac, I use Homebrew:

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
    brew install nodejs

For Windows, I prefer Chocolatey:

    @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

    cinst nodejs.install

On Linux distro's, just use your package manager of choice, but make sure you get at least v0.10.2+ and that you also get npm.


Once you have NodeJS and NPM installed, open a terminal window / command prompt and navigate to the root of the project (where gulpfile.js and package.json are located).

    cd /path/to/project

Now install Gulp globally:

    sudo npm install -g gulp

And then install the npm dependencies defined in package.json:

    npm install

## Gulp tasks ##

The complete list of commands for the gulp tasks is:

    # do a full build:
    gulp

    # process JS files (concat & minify to xs4all.js and vendors.js):
    gulp js

    # process SASS / CSS files (compile SASS, add browser prefixes,
    # concat & minify to desktop.css, mobile.css, print.css, tablet.css & xs4all.css)
    gulp css

    # watch for SASS / JS / JS Vendor source changes (runs the appropriate sub-task from
    # those listed above depending on which file was changed)
    gulp watch

    # copy resources to the deploy directory
    gulp resources

    # copy HTML to the deploy directory
    gulp html

    # run Jasmine BDD JavaScript tests
    gulp test

    # run JSHint checks
    gulp jshint

    # generate JSDoc documentation
    gulp jsdoc

**All these commands must be run in the root directory of the project (where gulpfile.js is)!**

There are also smaller tasks that make up each of the ones listed above, but these are not really useful on their own.

<a name="jsdoc"></a>
## JavaScript Documentation ##

Use JSDoc3 standard for inline documentation for all your code: [@use JSDoc](http://usejsdoc.org/index.html)

Then, when you run `gulp jsdoc` or just `gulp` for a complete build, you will get lovely, autogenerated API docs here:

    build/build/output/documentation/jsdoc/XS4ALL/index.html

<a name="jshint"></a>
## JavaScript quality & convention checking (LINT) ##

Running `gulp jshint`, `gulp js` or just `gulp` for a full build will cause JSHint analysis to be run against all the JavaScript source code.
Any problems will only be output to the console (not to a file).
Make sure you watch this and keep your code nice!

To add or remove rules, edit the `www/.jshintrc` file.
See [here](http://www.jshint.com/docs/options/) for a list of options.

If JSHint is complaining that an object "is not defined." that you know is defined in another file (like `$`, `jQuery`, `window`, `XS4ALL` etc.) then you can add it to the "predef" list in `www/.jshintrc`

<a name="jasmine"></a>
## JavaScript Unit Testing ##

You should unit test ALL your classes and methods!

*   Your test specs should go in `test/js/specs` and be named `classname-spec.js`.
*   You then need to import your new spec in `test/js/specrunner.html` under the `<!-- Include spec files -->` section.
*   You also need to import the new class file you are testing under the `<!-- Include source files -->` section.
*   Finally, if you have added any new 3rd party vendor files, you need to import them under the `<!-- Include vendor files -->` section.

For instructions on how to write Jasmine BDD 2.0 test specs, see [here](http://jasmine.github.io/2.0/introduction.html)

If you need to stub commonly used objects or write test helper functions, do so in `test/js/specs/spec-helper.js`

Running `gulp test` or just `gulp` for a full build will cause Jasmine BDD to run all your specs.

You can also run the tests in your browser by opening `test/js/specrunner.html`. This is REALLY useful because you can use the JavaScript console / Firebug / whatever to debug not only the tests, but also the source code they are testing!
