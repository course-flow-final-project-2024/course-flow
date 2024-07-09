import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";

const AdminCoursesList = () => {
  return (
    <Box>
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
                borderbuttom="1px"
                borderColor="gray.200"
              >
                <Td>1</Td>
                <Td>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="course-poster"
                    boxSize={47}
                  />
                </Td>
                <Td>Service Design Essentials</Td>
                <Td>6 Lessons</Td>
                <Td>3,559.00</Td>
                <Td>12/02/2022 10:30PM</Td>
                <Td>12/02/2022 10:30PM</Td>
                <Td>
                  <Flex gap={2}>
                    <Image src="/icons/delete.svg" alt="delete icon" />
                    <Image src="/icons/edit.svg" alt="edit icon" />
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default AdminCoursesList;
