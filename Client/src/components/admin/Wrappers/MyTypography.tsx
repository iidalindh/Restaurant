import React from "react";
import {Typography as TypographyBase} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
// @ts-ignore
import {TypographyProps, TypographyTypeMap} from "@material-ui/core/Typography/Typography";


interface MyTypographyProps extends React.HTMLAttributes<HTMLDivElement> {
    weight?: string,
    size?: string,
    colorBrightness?: string,
    color?: string,
    variant?: string,
    className?: string
}

const MyTypography: React.FC<MyTypographyProps> = ({
                                                       children,
                                                       weight,
                                                       size,
                                                       colorBrightness,
                                                       color,
                                                       className,
                                                       ...props
                                                   }) => {
    const theme = useTheme();

    return (
        // @ts-ignore
        <TypographyBase
            style={{
                color: getColor(color, theme, colorBrightness),
                fontWeight: getFontWeight(weight),
                fontSize: getFontSize(size, props.variant, theme),
            }}
            className={className}
            {...props}
        >
            {children}
        </TypographyBase>
    );
};


export {MyTypography};

// ########################################################################

function getColor(color: string | undefined, theme: any, brigtness = "main") {
    if (color && theme.palette[color] && theme.palette[color][brigtness]) {
        return theme.palette[color][brigtness];
    }
}

function getFontWeight(style: any) {
    switch (style) {
        case "light":
            return 300;
        case "medium":
            return 500;
        case "bold":
            return 600;
        default:
            return 400;
    }
}

function getFontSize(size: any, variant = "", theme: any) {
    let multiplier;

    switch (size) {
        case "sm":
            multiplier = 0.8;
            break;
        case "md":
            multiplier = 1.5;
            break;
        case "xl":
            multiplier = 2;
            break;
        case "xxl":
            multiplier = 3;
            break;
        default:
            multiplier = 1;
            break;
    }

    var defaultSize =
        variant && theme.typography[variant]
            ? theme.typography[variant].fontSize
            : theme.typography.fontSize + "px";

    return `calc(${defaultSize} * ${multiplier})`;
}
