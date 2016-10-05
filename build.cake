#addin "nuget:?package=Cake.SquareLogo"

Task("Logo").Does(() =>{
    CreateLogo("Github", "images/icon.png", new LogoSettings {
        Background = "DarkSlateBlue",
        Foreground = "White"
    });
});

var target = Argument("target", "default");
RunTarget(target);