---
title: "hello, world!"
date: 2026-07-20
tags: test, meta
---

this is the inaugural post of my blog. it's very exciting indeed

maybe one day i will have something interesting to say. today is not that day

## why a blog?

![good question](/assets/images/goodquestion.png)

but now that you ask, here are some things i might write about:

- learning new things
- linux
- windows slander
- local llm's
- sex gifs

## code blocks look cool

so here are a few

```c
#include <stdio.h>

int main(void) {
    printf("ewa ik ben een kat\n");
    return 0;
}
```

```nix
{
  description = "my very cool flake";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }: {
    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;
  };
}
```

and some python because why not:

```python
def greet(name: str) -> str:
    return f"cześć {name}, jestem kotem"

print(greet("kurwa"))
```

## inline code

you can also use `inline code` like `sudo rm -rf /` (please don't)

## lists

unordered:

- meow
- nya
- rawr x3

ordered:

1. wake up
2. grab my brush and put a little make-up
3. hide the scars to fade away the shake-up
4. i fucking left the keys upon the table

## blockquotes

> i am living in your walls

— michale jackson

## images

![funny cat](/assets/images/funnycat.jpeg)

that's the cat

---

this line is hidden and i do not know why