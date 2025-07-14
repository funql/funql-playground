"use client"

import React, {useEffect, useState} from "react";
import {
  Ambulance,
  Apple,
  Atom,
  Axe,
  Baby,
  Banana,
  Beef,
  Beer,
  Bird,
  Bone,
  Bus,
  CableCar,
  Candy,
  CandyCane,
  Car,
  Caravan,
  Carrot,
  Castle,
  Cat,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  Croissant,
  CupSoda,
  Dessert,
  Dog,
  Drill,
  Drum,
  Drumstick,
  Feather,
  FerrisWheel,
  FireExtinguisher,
  Fish,
  Flower2,
  Forklift,
  Gamepad,
  Gamepad2,
  Ghost,
  GlassWater,
  Grape,
  Guitar,
  Ham,
  Hop,
  IceCreamBowl,
  IceCreamCone,
  Joystick,
  Leaf,
  LeafyGreen,
  Lollipop,
  LucideIcon,
  Martini,
  Milk,
  Nut,
  Origami, PartyPopper,
  Pickaxe,
  PiggyBank,
  Pizza,
  Popsicle,
  Rabbit,
  Rat,
  Rocket,
  Sailboat,
  Salad,
  Snail,
  Soup,
  Squirrel,
  TrafficCone,
  TreePalm,
  Turtle, Wine, Worm
} from "lucide-react";
import {cn} from "@workspace/ui/lib/utils";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import confetti from "canvas-confetti";
import {useTranslations} from "next-intl";

const icons: LucideIcon[] = [
  Bird,
  Origami,
  Banana,
  Carrot,
  Caravan,
  CupSoda,
  Drumstick,
  Dog,
  Ghost,
  Guitar,
  Ham,
  Milk,
  PiggyBank,
  Rocket,
  Salad,
  Soup,
  Snail,
  Squirrel,
  TrafficCone,
  Turtle,
  Ambulance,
  Apple,
  Atom,
  Axe,
  Baby,
  Beef,
  Beer,
  Bone,
  Bus,
  CableCar,
  Car,
  Castle,
  Cat,
  Candy,
  CandyCane,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  Croissant,
  Dessert,
  Drill,
  Drum,
  Feather,
  FerrisWheel,
  FireExtinguisher,
  Fish,
  Flower2,
  Forklift,
  Gamepad,
  Gamepad2,
  GlassWater,
  Grape,
  Hop,
  IceCreamBowl,
  IceCreamCone,
  Joystick,
  Leaf,
  LeafyGreen,
  Lollipop,
  Martini,
  Nut,
  Pickaxe,
  Pizza,
  Popsicle,
  Rabbit,
  Rat,
  Sailboat,
  TreePalm,
  Wine,
  Worm,
  PartyPopper,
]

export default function ResponseNoResponse({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("HomePage.response.ResponseNoResponse")

  const { activeRequest } = useEditorState()
  const [Icon, setIcon] = useState<LucideIcon|undefined>()
  const [partyPopped, setPartyPopped] = useState(false)

  const setRandomIcon = () => setIcon(icons[Math.floor(Math.random() * icons.length)]!)

  // We'll show a random icon each time the request changes, just for fun
  useEffect(() => {
    setRandomIcon()
  }, [setIcon, activeRequest?.id])

  const onIconClick = (event: React.MouseEvent) => {
    if (Icon === PartyPopper && !partyPopped) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      })
      setPartyPopped(true)
    } else {
      if (partyPopped) {
        setPartyPopped(false)
      }

      setRandomIcon()
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col flex-1 h-0 w-full items-center justify-center p-4",
        className
      )}
      {...props}
    >
      {Icon && (
        <>
          <Icon className="size-8 shrink-0" onClick={onIconClick}/>
          <span className="text-center">
            {t("sendHint")}
          </span>
        </>
      )}
    </div>
  )
}