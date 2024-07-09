import { Card, Image, CardBody, Text, Stack, Heading } from "@chakra-ui/react";

export default function CourseCard() {
  return (
    <div>
      <div>
        <Card className="sm:w-[375px] w-[343px] h-[475px] mb-[28px]">
          <CardBody
            borderRadius="8px"
            padding="0px"
            boxShadow="2px 2px 12px 0 rgba(0, 0, 0, 0.08)"
          >
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderTopRadius="8px"
              height="240px"
              width="full"
            />
            <Stack spacing="3" marginY="24px" padding="0px 16px 16px 16px">
              <Text color="#F47E20" fontSize="14px">
                Course
              </Text>
              <Heading size="24px">Living room Sofa</Heading>
              <Text color="#646D89" fontSize="16px">
                This sofa is perfect for modern tropical spaces between eiei cry
                baby.
              </Text>
            </Stack>
            <div className="flex border-t-[1px] border-t-[#E4E6ED] gap-6 p-4">
              <div> x Lesson</div>
              <div> x Hours</div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
