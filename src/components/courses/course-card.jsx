import { Card, Image, CardBody, Text, Stack, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function CourseCard({
  course_id,
  course_image,
  course_name,
  summary,
  warning,
  lessons,
  duration,
  index,
}) {
  return (
    <Link
      href={`/courses/${course_id}`}
      key={index}
      className="sm:w-[357px] w-[343px] h-[475px] sm:mb-[28px] mb-[20px] cursor-pointer"
    >
      <Card className="sm:w-[357px] w-[343px] h-[475px] sm:mb-[28px] mb-[20px]">
        <CardBody
          borderRadius="8px"
          padding="0px"
          boxShadow="2px 2px 12px 0 rgba(0, 0, 0, 0.08)"
        >
          <Image
            src={course_image ? course_image : "/logo/CourseFlowLogo.svg"}
            alt={course_name}
            borderTopRadius="8px"
            height="240px"
            width="full"
          />
          <Stack
            spacing="3"
            marginY="14px"
            marginBottom="5px"
            padding="0px 16px 16px 16px"
            height="160px"
            className="relative"
          >
            <Text color="#F47E20" fontSize="14px">
              Course
            </Text>
            <Heading size="24px" fontWeight={500}>
              {course_name}
            </Heading>
            <Text color="#646D89" fontSize="16px" height="42px">
              {summary}
            </Text>
            <Text className="absolute bottom-0 text-red-600 text-sm">
              {warning}
            </Text>
          </Stack>
          <div className="flex border-t-[1px] border-t-[#E4E6ED] gap-4 p-4">
            <div className="flex gap-1 w-[100px] sm:w-[110px]">
              <Image
                src="/icons/book.svg"
                alt="book icon"
                width="24px"
                height="24px"
              />
              <Text className=" sm:text-base text-sm">
                {lessons.length} Lessons
              </Text>
            </div>
            <div className="flex gap-1 w-[110px] sm:w-[110px]">
              <Image
                src="/icons/time.svg"
                alt="time icon"
                width="24px"
                height="24px"
              />
              <Text className=" sm:text-base text-sm">{duration} Hours</Text>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
