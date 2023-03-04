# Set up the Dropbox directory

That title is confusing, right? Why would Dropbox have anything to do with this, if we're syncing with iCloud?

Let's take a step back. Our aim here is to create a directory to house all of the TypeScript and build files, which, when built, will be placed into the Scriptable directory and thus sync with Scriptable on your device.

It made sense to me for this directory to live within the Scriptable folder in iCloud, e.g. `iCloud/Scriptable/src`. The problem, however, is that **there's no easy way to exclude a sub-directory from iCloud sync.** And the problem with _that_ is that you really don't want hundreds of megabytes of code (via `/node_modules`) clogging up your iCloud syncing (which is already shaky, in my experience).

The solution that I found is to name this source directory something that iCloud ignores during sync. One of those directory names is `Dropbox`, but there are more examples and context [in this Stackexchange thread](https://apple.stackexchange.com/a/295929).

| INFO: As with the rest of this guide, you're free to set this up however you like. This is simply one path that works for me. |
| ----------------------------------------------------------------------------------------------------------------------------- |

## Do it

1. Navigate to the Scriptable directory in iCloud (on your computer).
2. Create a new directory called `Dropbox`, or whatever you decide.
3. Open this directory in your preferred code editor.
