import MyButton from ".";

export default {
    title: "GreenVolition/Components/MyButton",
    component: MyButton,
}

const Template = (args) => <MyButton {...args} />

export const PrimaryBtnSmall = Template.bind({});
PrimaryBtnSmall.args = {
    buttonText: "Primary sm",
    colorScheme: "teal",
    variant: "solid",
    size: "sm",
}

export const PrimaryBtnMid = Template.bind({});
PrimaryBtnMid.args = {
    buttonText: "Primary md",
    colorScheme: "teal",
    variant: "solid",
    size: "md",
}

export const PrimaryBtnLarge = Template.bind({});
PrimaryBtnLarge.args = {
    buttonText: "Primary lg",
    colorScheme: "teal",
    variant: "solid",
    size: "lg",
}