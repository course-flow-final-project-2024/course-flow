import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";

const AdminCoursesList = () => {
  return (
    <div>
      <TableContainer borderRadius="lg">
        <Table variant="simple">
          <Thead>
            <Tr bg="gray.200" color="gray.800" borderRadius="md">
              <Th></Th>
              <Th>Image</Th>
              <Th>Course Name</Th>
              <Th>Lesson</Th>
              <Th>Price</Th>
              <Th>Created date</Th>
              <Th>Updated date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* 1 */}
            <Tr
              bg="white"
              color="black"
              height="88px"
              BorderButtom="1px"
              borderColor="gray.200"
            >
              <Td>1</Td>
              <Td>
                <Image
                  src="/logo/CourseFlow-logo.svg"
                  width={174}
                  height={47}
                />
              </Td>
              <Td>Service Design Essentials</Td>
              <Td>6 Lessons</Td>
              <Td>3,559.00</Td>
              <Td>12/02/2022 10:30PM</Td>
              <Td>12/02/2022 10:30PM</Td>
              <Td>
                <Flex gap={2}>
                  <Image
                    src="/icons/delete.svg"
                    alt="delete icon"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/edit.svg"
                    alt="edit icon"
                    width={24}
                    height={24}
                  />
                </Flex>
              </Td>
            </Tr>
            {/* 2 */}
            <Tr
              bg="white"
              color="black"
              height="88px"
              BorderButtom="1px"
              borderColor="gray.200"
            >
              <Td>1</Td>
              <Td>
                <Image
                  src="/logo/CourseFlow-logo.svg"
                  width={174}
                  height={47}
                />
              </Td>
              <Td>Service Design Essentials</Td>
              <Td>6 Lessons</Td>
              <Td>3,559.00</Td>
              <Td>12/02/2022 10:30PM</Td>
              <Td>12/02/2022 10:30PM</Td>
              <Td>
                <Flex gap={2}>
                  <Image
                    src="/icons/delete.svg"
                    alt="delete icon"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/edit.svg"
                    alt="edit icon"
                    width={24}
                    height={24}
                  />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminCoursesList;
