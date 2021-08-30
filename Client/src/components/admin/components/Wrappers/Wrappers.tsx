import React from "react";
import {Badge as BadgeBase, Button as ButtonBase, Typography as TypographyBase, withStyles} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import classnames from "classnames";
// @ts-ignore
import {TypographyProps, TypographyTypeMap} from "@material-ui/core/Typography/Typography";
import {ExtendButtonBase} from "@material-ui/core/ButtonBase";
import {ButtonTypeMap} from "@material-ui/core/Button/Button";

// styles
var useStyles = makeStyles(theme => ({
    badge: {
        fontWeight: 600,
        height: 16,
        minWidth: 16,
    },
}));

interface BadgeProps {
    children: any,
    colorBrightness: any,
    color: any,
}

const Badge: React.FC<BadgeProps> = ({children, colorBrightness, color, ...props}) => {
    var classes = useStyles();
    var theme = useTheme();
    var Styled = createStyled({
        badge: {
            backgroundColor: getColor(color, theme, colorBrightness),
        },
    });

    return (
        <Styled>
            {(styledProps: any) => (
                <BadgeBase
                    classes={{
                        badge: classnames(classes.badge, styledProps.classes.badge),
                    }}
                    {...props}
                >
                    {children}
                </BadgeBase>
            )}
        </Styled>
    );
};

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

interface ButtonProps extends ExtendButtonBase<ButtonTypeMap> {
    select: string,
    color: string,
    className: string
}

const Button: React.FC<ButtonProps> = ({children, color, className, ...props}) => {
    const theme: any = useTheme();

    const Styled = createStyled({
        root: {
            color: getColor(color, theme),
        },
        contained: {
            backgroundColor: getColor(color, theme),
            boxShadow: theme.customShadows.widget,
            color: `${color ? "white" : theme.getPalette().text.primary} !important`,
            "&:hover": {
                backgroundColor: getColor(color, theme, "light"),
                boxShadow: theme.customShadows.widgetWide,
            },
            "&:active": {
                boxShadow: theme.customShadows.widgetWide,
            },
        },
        outlined: {
            color: getColor(color, theme),
            borderColor: getColor(color, theme),
        },
        select: {
            backgroundColor: theme.getPalette().primary.main,
            color: "#fff",
        },
    });

    return (
        <Styled>
            {({classes}: any) => (
                <ButtonBase
                    classes={{
                        contained: classes.contained,
                        root: classes.root,
                        outlined: classes.outlined,
                    }}
                    {...props}
                    className={classnames(
                        {
                            [classes.select]: props.select,
                        },
                        className,
                    )}
                >
                    {children}
                </ButtonBase>
            )}
        </Styled>
    );
};

export {Badge, MyTypography, Button};

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

function createStyled(styles: any, options?: any) {
    const Styled = function (props: any) {
        const {children, ...other} = props;
        return children(other);
    };

    return withStyles(styles, options)(Styled);
}
