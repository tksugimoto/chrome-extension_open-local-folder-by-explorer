( **English** / [日本語(Japanese)](README_ja.md) )

# Chrome Extension to open local folder in Explorer from Chrome

## Function.
- Open the folder in Explorer
- (For files) Open the parent folder in Explorer with the file selected.


## Targetable folders and files.
- Current tab (if the URL starts with `file://`)
- The URL of the link (if the URL begins with `file://`)
- Selection string (if the selection string begins with `C:\`, `\\ComputerName\`, etc.)
    - The `"` (double quotation) at the beginning and end is ignored only when it exists at both the beginning and end.


## :warning: Notes.
In order to control the host side from Chrome, you need to do the following:
- Install Node.js
- Registry Changes


## Usage.
1. Install the extension
2. Configure it according to the `Setup` tab opened at the time of installation.
    - If you need to reconfigure it, you can do so from the extension's options page
3. Select "Open ... in Explorer" from the context menu of page, link, and selected text
    - Open folder in Explorer
    - Open the link destination in Explorer (for local files)
    - Open the selected string in Explorer (for local file path)

### Changing the title of the context menu.
#### Benefits.
If you change it to alphabetic, you can select it with the keyboard.

#### How to change.
1. Open the settings page (option page)
1. Set a new title for each type of context menu in the `"Change the context menu title"` part

## Icons.
We have used the following material icons which can be downloaded from : [icon material download site "icooon-mono"](http://icooon-mono.com/) [Folder Icons Web graphics Part 2](http://icooon-mono.com/00019-%e3%83%95%e3%82%a9%e3%83%ab%e3%83%80%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90-%e3%81%9d%e3%81%ae2/).
