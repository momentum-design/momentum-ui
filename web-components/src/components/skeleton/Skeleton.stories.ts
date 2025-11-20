import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { Skeleton as SKELETON, skeletonAnimationTypes, skeletonVariants } from "./Skeleton";
import "./Skeleton.ts";

interface SkeletonArgs {
  width?: string;
  height?: string;
  variant?: SKELETON.Variant;
  animation?: SKELETON.AnimationType;
}

const meta = {
  title: "Components/Skeleton",
  component: "md-skeleton",
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: { type: "radio" },
      options: skeletonAnimationTypes,
      description: "Animation type for the skeleton",
      table: { defaultValue: { summary: "pulse" } }
    },
    variant: {
      control: { type: "radio" },
      options: skeletonVariants,
      description: "Variant for the skeleton"
    },
    height: {
      control: { type: "text" },
      description: "Height of skeleton. Any valid CSS values are accepted."
    },
    width: {
      control: { type: "text" },
      description: "Width of skeleton. Any valid CSS values are accepted."
    }
  },
  parameters: {
    a11y: {
      element: "md-skeleton"
    }
  }
} satisfies Meta<SkeletonArgs>;
export default meta;
type Story = StoryObj<SkeletonArgs>;

export const Rounded: Story = {
  args: {
    width: "100px",
    height: "100px"
  },
  parameters: {
    docs: {
      source: {
        code: `<md-skeleton width="100px" height="100px" variant="rounded"></md-skeleton>`
      }
    }
  }
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "200px",
    height: "100px"
  },
  parameters: {
    docs: {
      source: { code: `<md-skeleton width="200px" height="100px" variant="rectangular"></md-skeleton>` }
    }
  }
};

export const Circle: Story = {
  args: {
    variant: "circle",
    width: "100px",
    height: "100px"
  },
  parameters: {
    docs: {
      source: { code: `<md-skeleton width="100px" height="100px" variant="circle"></md-skeleton>` }
    }
  }
};

export const NoAnimation: Story = {
  args: {
    width: "100px",
    height: "100px",
    animation: "none"
  },
  parameters: {
    docs: {
      source: { code: `<md-skeleton width="100px" height="100px" variant="circle" animation="none"></md-skeleton>` }
    }
  }
};

export const NoDimensions: Story = {
  render: () =>
    html` <div style="width: 200px; height: 100px; border: 1px solid black; padding: 1px;">
      <md-skeleton></md-skeleton>
    </div>`,
  parameters: {
    docs: {
      description: {
        story: "If dimensions are not specified, the skeleton will expand to fill its container."
      },
      source: {
        code: `
<div style="width: 200px; height: 100px; border: 1px solid black; padding: 1px;">
  <md-skeleton></md-skeleton>
</div>
        `
      }
    }
  }
};

const Template = () =>
  html` <style>
      .container {
        display: flex;
        gap: 0.5em;
      }
      .container-right {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
      }
    </style>
    <div class="container">
      <md-skeleton width="25px" height="25px" variant="circle"></md-skeleton>
      <div class="container-right">
        <md-skeleton width="200px" height="10px"></md-skeleton>
        <md-skeleton width="200px" height="10px"></md-skeleton>
      </div>
    </div>`;

export const Example: Story = {
  render: Template,
  parameters: {
    docs: {
      source: {
        code: `
<style>
  .container {
    display: flex;
    gap: 1em;
  }
  .container-right {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
</style>

<div class="container">
  <md-skeleton width="20px" height="20px" variant="circle"></md-skeleton>
  <div class="container-right">
    <md-skeleton width="200px" height="10px"></md-skeleton>
    <md-skeleton width="200px" height="10px"></md-skeleton>
  </div>
</div>
        `
      }
    }
  }
};
