---
title: 'Devlog: Making Entity Component System Game Engine with C and Wasm'
description: so that i can brag that my site is not garbage collected
date: "2022-05-13"
image: '/assets/images/meme_drake_javascript_c_wasm.png'
author: Ghibranalj
---

Lets admit it, WebAssemly is a big deal. Running low level code on the broser is a big deal. It opens up a lot of possibilities, one of them is making a entity component system based game engine.

In this devlog im going to show you how I made a game engine that is going to run on the browser using WebAssembly written in C. The game engine is going to use the GPU for rendering graphics and maybe ill add fancy stuff like lighting and particles later.

I also want an engine with a level editor [lDTK level editor](https://ldtk.io/) by the maker of the game Dead Cells into my engine. So that i dont have to make a map with code, which is a bit nightmarish.

here is a demonstration of my engine running on the browser
<iframe src="https://www.youtube.com/embed/UxfMemeihBo" title="Demonstration of my engine" frameborder="0" allowfullscreen></iframe>

[Github Repo](https://github.com/Ghibranalj/my-site)

## Why C?
I wanted to learn WebAsembly at the lowest level possible while still somewhat keeping my sanity. With [emscripten](https://emscripten.org/) i was able to compile C code to webassembly, it even genrates the javascript loader for you.

## What is Entity Component System (ECS)?

I know most of you are web developers so you might not be familiar with the concept of ECS.

Entity Component System is a software architectural pattern that splits logic into entitiy, component and system. Entity is a thing, component is a thing that is attached to an entity, and system is a thing that is responsible for doing something with the entity.

For example in chess, entity is a piece, component is the piece's position, and system is the piece's movement.

One neat thing about ECS is that it is very easy to be modular with your code.

Again with chess, you have a bishop that moves horizontally, so you can have an entity that has a component `can_move_horizontal`, and a rook  is an entity with the `can_move_lateral` component. When its time to implement the queen you dont have to do anything more, you only need to add both the `can_move_horizontal` and `can_move_lateral` components to an entity since a queen can move laterally and horizontally.

However, a component is not logic. Logic is the job of Systems. The way you do this is by searching throuhg the world for entities that have a certain component and attaching to it logic.

In Javascript (OOP) it would look something like this
```javascript
// this is a system
horizontal_mover(entity){
  // logic to move horizontally
}

world.getEntities().forEach(entity => {
  if(entity.has('can_move_horizontal')){
    horizontal_mover(entity)
  }
}
```

</br>

In C unsing the library [flecs](https://github.com/SanderMertens/flecs), we could do somthing much much cooler. Instead of using a forEach loop, we could just a query on the world. Yes, like a database.

```C
ECS_SYSTEM(world,
           horizontal_mover,
           EcsOnUpdate,
           can_move_horizontal);
```

This piece of code tell the ECS to query the world for entities that have the `can_move_horizontal`  component and then attach the `horizontal_mover` system on them.
Lets call it regeistering a system for now on for simplicity.

## GPU rendering
In the past i have tried making my own GPU rendering pipeline. I dont want to do it this time since it is a nightmare to make, and I dont want to write too much shader code in this project.

I have heard a lot about [raylib](https://www.raylib.com/). It is supposed to be the easiest way to to make a game engine from scratch. So I decided to use it.

People were right, it was not a nightmare to use. It was really a breeze to start rendering graphics.

However raylib is just a barebones library so we need to ECS-ify it ourselves.

How i did it was : by using [flecs](https://github.com/SanderMertens/flecs) i created a component `we_sprite` and `we_transform`
```C
typedef struct {
    Texture2D texture;
} we_sprite;

typedef struct {
    Vector2 position;
} we_transform;
```
And the system `we_draw_system`
```C
void we_draw_system(ecs_iter_t *it) {
    we_sprite *sprite = ecs_term(it, we_sprite, 1);
    we_transform *trans = ecs_term(it, we_transform, 2);

    for (int i = 0; i < it->count; i++) {
        we_transform tran = trans[i];

        Vector2 p = tran.position;

        we_sprite sp = sprite[i];
        Texture2D tex = sp.texture;
        DrawTexture(tex, p.x, p.y, WHITE);
    }
}
```

Then on the initialization phase of the engine we need to register the components and system.
```C
// create the world
ecs_world_t *world = ecs_init();

ECS_COMPONENT(world, we_sprite);
ECS_COMPONENT(world, we_transform);

ECS_SYSTEM(world, we_draw_system,
          EcsOnUpdate,
          we_sprite,
          we_transform);
```

Then we create an entity with both components.

```C
ecs_entity_t e = ecs_new_id(world);
// add and set transform to entity
ecs_add(world, e, we_transform);
ecs_set(world, e, we_transform, {.position = {100, 100}});
// add and set spitesheet to entity
ecs_add(world, e, we_sprite);
ecs_set(world, e, we_sprite,
            {.texture = LoadTexture("/path/to/sprite")});
```

then we need to update the ECS every frame render of the game engine
```C
ecs_progress(world, delta);
```

AND BOOM!
Your sprite is rendered

## Level Editor
It is possible to just programmatically create levels but really want to keep my sanity here so  a level editor is a must.

I choose to use LDTK because you can create a level semi-precedurally with auto layout. For example : you can create a desert besides a forest and the level editor will automatically create a boundary between the two (Assuming you configure it correctly).


A demonstration of LTDK:
<iframe  src="https://www.youtube.com/embed/O1pmIImzEts" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

### Integrating lDKT with C and ECS
First i tried the [cLDtk](https://github.com/PompPenguin/cLDtk) library, but i couldn't get it to compile to Wasm using [emscripten](https://emscripten.org/). This took me about two days to figure out and definitely gave me depression. 
Thankfully lDTK supports the `.tmx` file format, and there is a great tmx parser for C called [tmx](https://github.com/baylej/tmx).

Now lets integrate tmx with ECS

What I did was i created a component `we_map`
```C
typedef struct {
    tmx_map *map;
} we_map;
```
This component is resposniible for holding the tmx map.

I also created the system `we_draw_map_system`

```C
void we_draw_map_system(ecs_iter_t *it) {
    // this queries the map from the entity
    we_map *map_cs = ecs_term(it, we_map, 1);
    // loop through every element that has the map component
    for (int i = 0; i < it->count; i++) {
        // get the map component for a given entity
        we_map map_c = map_cs[i];
        tmx_map *map = map_c.map;

        // draw all layers of the map
        draw_all_layers(map, map->ly_head);
    }
}

// then we register the system
ECS_SYSTEM(we_world, 
          we_draw_map_system, 
          EcsPreUpdate, we_map);
```

Note: i got the function `draw_all_layers` from the [documentation](https://libtmx.readthedocs.io/en/latest/renderer-from-scratch.html) for tmx


After everything is set up, loading and rendering the map is as simple as this:
```C
tmx_map *map = tmx_load("path/to/map.tmx");
ecs_entity_t e = ecs_new_id(world);
ecs_add(world, e, we_map);
ecs_set(world, e, we_map, {.map = map});
```

## Compiling it all
I had to compile all the libraries use manually with emscripten. This is because emscripten has its own set of the standard libraries that are meant to run on the browser.

I needed to static link everything since WASM doesn't support dynamic linking.

I also needed to bundle your resources and assets to a `.data` file

After that with this command you can compile everything:

```bash
emcc main.c engine.c -o index.html \
 -L$(/path/to/.a/libraries) $(/path/to/.a/libraries)\
 --preload-file $(ASSET_PATH)
```
<br/>
<br/>
And that concludes my first devlog. Thank you for reading 💕.

If you want to read my code. You can find it on [GitHub](https://github.com/Ghibranalj/my-site)