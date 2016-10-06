#addin "nuget:?package=Cake.SquareLogo"

Task("Icon").Does(() =>{
    CreateLogo("Github", "images/icon.png", new LogoSettings {
        Background = "Green",
        Foreground = "White",
        FontFamily = "Optima",
        Padding = 50
    });
});

var target = Argument("target", "default");
RunTarget(target);