# Drumbeat

A drum rhythm game under the lanterns of a night festival: red and blue notes scroll toward the circle, hit in the center or on the rim when they touch it. Play the 1200 tracks from the Rythme plugin, or your own music.

*Version française : [README.md](README.md)*

## How to play

- **Red notes**: center hit, with **F** or **J**.
- **Blue notes**: rim hit, with **D** or **K**. Hitting the wrong color counts as a miss.
- **Big notes**: they come from the track's chords; hit with **both hands** almost together (F and J, or D and K) to double the points.
- **Yellow bars**: a drumroll, on long notes. Tap as fast as you can, every hit scores.
- With the **mouse** or a **finger**: the **DON** (red) and **KA** (blue) pads at the bottom of the screen.
- **Space**: play · **P**: pause · **Full screen** during the game.

## Accuracy and points

Notes are judged by how far they are from the right moment: **Perfect** (about ±45 ms), **Good** (±90 ms), **OK** (±140 ms), otherwise a miss.

A note's points rise by 1 % per note of combo, up to double at 100 notes in a row; a miss resets the combo. At the end, accuracy gives a grade: **S** from 95 %, **A** at 90 %, **B** at 80 %, **C** at 70 %, **D** below.

## Songs and difficulty

The **Songs** tab has the 1200 Rythme tracks, in four difficulties (Easy, Normal, Hard, Expert). Each level's difficulty is computed from its notes (density, busy passages), from 1 to 10 stars.

## My music

In **My music**, create a level from an imported **audio file** or a track from your **NeoMusic** library: the game finds its tempo and strong beats and turns them into a level, at the chosen **difficulty** (1 to 10 stars).

## Difficulty branches

With **Branches: Yes** (setting), each song has three paths: **NORMAL**, **EXPERT** and **MASTER**. Every 4 bars, the track goes up a level if you had at least 90 % accuracy on the previous 4 bars, and goes back down below 65 %. The current branch is shown at the top and the track changes colour.

## Balloons and kusudama

- **Balloon** (orange): it stops on the circle; hit the centre (F or J) the number of times written on it before it leaves to pop it.
- **Kusudama** (the big golden ball, once near the end): same thing, centre or rim, with a big bonus and fireworks.

## Dan trial

Pick a **Dan** (1 to 10) then **START THE TRIAL**: 4 songs in a row, faster and faster. You need at least the required accuracy on each and no more than a number of misses over the 4. Space goes to the next song. Your best Dan is kept.

## .tja songs

In **My music**, **IMPORT A .TJA (TAIKO)**: pick the **.tja** file and its music (often an .ogg) together. The game reads the difficulties (Easy, Normal, Hard, Oni, Ura), big notes, rolls, balloons, tempo and measure changes, and the file's branches. The song is kept on this PC; **×** removes it.

## Festival

The lanterns light up one by one, every 10 combo, and a **full combo** ends in fireworks. Each hit sounds a little different. USB drums that plug in as a gamepad or as a keyboard (D, F, J, K keys) work.

## Settings

- Music **volume**.
- **Hit sound**: the sound played on each note you hit, one of 10 (Soft, Clap, Wood, Kick, Crystal, Pop, Hi-hat, Snare, Pluck, Tock) or none. Losing a combo of 10 or more plays a « combo break » sound.
- **Offset** (−300 to +300 ms): it adjusts itself after each game based on your average lateness or earliness; you can also change it by hand.

## Data and sync

Your scores and grades per level and your settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Drumbeat → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## Gamepad and accuracy curve

- **Gamepad**: A and B hit red (both at once for a big note), X, Y and the shoulder buttons hit blue. Start starts the song, Select pauses.
- **End screen**: a curve shows your accuracy along the song, with missed notes in red.

## The mascot

NeoMe dances at the edge of the stage during the game, with a tied headband and a fan: a step left, a step right, and jumps when the crowd cheers.
