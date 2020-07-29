# Chrome Extension to open local folder in Explorer from Chrome

## Function.
- Open the folder in Explorer
- (For files) Open the parent folder in Explorer with the file selected.


## Targetable folders and files.
- Current tab (if the URL starts with `file://`)
- The URL of the link (if the URL begins with `file://`)
- Selection string (the selection string starts with `C:\\`, `C:\`, `C:ComputerName`, etc.) (If)
    - Ignore leading and trailing `"` (double quotation marks) if they are present at both ends. (only)


## :warning: Notes.
In order to control the host side from Chrome, you need to do the following:
- Install Node.js
- Registry Changes


## Usage.
1. install the extension
Configure it according to the `configuration` tab opened at the time of installation.
    - If you need to reconfigure it, you can do so from the extension's options page
2. from the right-click menu of a page, link, or selected text, click "Open ~~ in Explorer" then select:
    - Open the folder in Explorer
    - Open the link in Explorer (for a local file)
    - Open the selected string in Explorer (for local file path)

### Changing the title of the right-click menu.
#### Benefits.
If you change it to alphabetic, you can select it with the keyboard.

#### How to change.
1. open the settings page (option page)
New titles for each type of right-click menu in the `Change Right-Click Menu Title` section.

## Icons.
We have used the following material icons which can be downloaded from : [icon material download site "icooon-mono"](http://icooon-mono.com/) [Folder Icons Web graphics Part 2](http://icooon-mono.com/00019-%e3%83%95%e3%82%a9%e3%83%ab%e3%83%80%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90-%e3%81%9d%e3%81%ae2/).
