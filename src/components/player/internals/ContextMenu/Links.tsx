import classNames from "classnames";
import { ReactNode } from "react";

import { Icon, Icons } from "@/components/Icon";
import { Title } from "@/components/player/internals/ContextMenu/Misc";

export function Chevron(props: { children?: React.ReactNode }) {
  return (
    <span className="text-white flex items-center font-medium">
      {props.children}
      <Icon className="text-xl ml-1 -mr-1.5" icon={Icons.CHEVRON_RIGHT} />
    </span>
  );
}

export function LinkTitle(props: {
  children: React.ReactNode;
  textClass?: string;
}) {
  return (
    <span
      className={classNames([
        "font-medium text-left",
        props.textClass || "text-video-context-type-main",
      ])}
    >
      {props.children}
    </span>
  );
}

export function BackLink(props: {
  onClick?: () => void;
  children: React.ReactNode;
  rightSide?: React.ReactNode;
}) {
  return (
    <Title rightSide={props.rightSide}>
      <button
        type="button"
        className="-ml-2 p-2 rounded hover:bg-video-context-light hover:bg-opacity-10"
        onClick={props.onClick}
      >
        <Icon className="text-xl" icon={Icons.ARROW_LEFT} />
      </button>
      <span className="line-clamp-1 break-all">{props.children}</span>
    </Title>
  );
}

export function Link(props: {
  rightSide?: ReactNode;
  clickable?: boolean;
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}) {
  const classes = classNames("flex py-2 px-3 rounded w-full -ml-3", {
    "cursor-default": !props.clickable,
    "hover:bg-video-context-border cursor-pointer": props.clickable,
    "bg-video-context-border": props.active,
  });
  const styles = { width: "calc(100% + 1.5rem)" };

  const content = (
    <div className={classNames("flex items-center flex-1", props.className)}>
      <div className="flex-1 text-left">{props.children}</div>
      <div>{props.rightSide}</div>
    </div>
  );

  if (!props.onClick) {
    return (
      <div className={classes} style={styles}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={styles}
      onClick={props.onClick}
    >
      {content}
    </button>
  );
}

export function ChevronLink(props: {
  rightText?: string;
  onClick?: () => void;
  children?: ReactNode;
  active?: boolean;
}) {
  const rightContent = <Chevron>{props.rightText}</Chevron>;
  return (
    <Link
      onClick={props.onClick}
      active={props.active}
      clickable
      rightSide={rightContent}
    >
      <LinkTitle>{props.children}</LinkTitle>
    </Link>
  );
}

export function SelectableLink(props: {
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}) {
  const rightContent = (
    <Icon
      icon={Icons.CIRCLE_CHECK}
      className="text-xl text-video-context-type-accent"
    />
  );
  return (
    <Link
      onClick={props.onClick}
      clickable={!props.disabled}
      rightSide={props.selected ? rightContent : null}
    >
      <LinkTitle
        textClass={classNames({
          "text-white": props.selected,
          "text-video-context-type-main text-opacity-40": props.disabled,
        })}
      >
        {props.children}
      </LinkTitle>
    </Link>
  );
}
