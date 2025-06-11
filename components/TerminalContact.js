"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { Fragment, useEffect, useRef, useState } from "react";
import { Box, Button, Heading, Text, Flex, Input } from "@chakra-ui/react";

const TerminalContact = () => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  return (
    <Box
      id="contact"
      bgImage="url('/ai-contact-2.jpg')"
      bgSize="cover"
      bgPos="center"
      py={12}
      px={4}
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(0, 15, 10, 0.3), rgba(0, 15, 10, 1))"
        zIndex={0}
      />
      <Box
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        h="96"
        bg="#020617b3"
        backdropFilter="auto"
        backdropBlur="8px"
        borderRadius="lg"
        w="full"
        maxW="3xl"
        mx="auto"
        overflowY="scroll"
        shadow="xl"
        cursor="text"
        fontFamily="mono"
      >
        <TerminalHeader />
        <TerminalBody inputRef={inputRef} containerRef={containerRef} />
      </Box>
    </Box>
  );
};

const TerminalHeader = () => {
  return (
    <Flex
      w="full"
      p={3}
      bg="black"
      align="center"
      gap={1}
      position="sticky"
      top={0}
    >
      <Box w={3} h={3} borderRadius="full" bg="red.500" />
      <Box w={3} h={3} borderRadius="full" bg="yellow" />
      <Box w={3} h={3} borderRadius="full" bg="green.500" />
      <Text
        fontSize="sm"
        color="green.500"
        fontWeight="semibold"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        contact@us.dev
      </Text>
    </Flex>
  );
};

const TerminalBody = ({ containerRef, inputRef }) => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState(QUESTIONS);
  const curQuestion = questions.find((q) => !q.complete);

  const handleSubmitLine = (value) => {
    if (curQuestion) {
      setQuestions((pv) =>
        pv.map((q) =>
          q.key === curQuestion.key ? { ...q, complete: true, value } : q
        )
      );
    }
  };

  return (
    <Box p={2} color="white" fontSize="lg">
      <InitialText />
      <PreviousQuestions questions={questions} />
      <CurrentQuestion curQuestion={curQuestion} />
      {curQuestion ? (
        <CurLine
          text={text}
          focused={focused}
          setText={setText}
          setFocused={setFocused}
          inputRef={inputRef}
          command={curQuestion?.key || ""}
          handleSubmitLine={handleSubmitLine}
          containerRef={containerRef}
        />
      ) : (
        <Summary questions={questions} setQuestions={setQuestions} />
      )}
    </Box>
  );
};

const InitialText = () => {
  return (
    <>
      <Text>{`Hey there! We're excited to link 🔗`}</Text>
      <Text overflow="hidden" whiteSpace="nowrap" fontWeight="light">
        ------------------------------------------------------------------------
      </Text>
    </>
  );
};

const PreviousQuestions = ({ questions }) => {
  return (
    <>
      {questions.map((q, i) =>
        q.complete ? (
          <Fragment key={i}>
            <Text>
              {q.text}
              {q.postfix && (
                <Text color="violet.300" as="span">
                  {q.postfix}
                </Text>
              )}
            </Text>
            <Text color="emerald.300">
              <FiCheckCircle color="#00ac69" />
              {q.value}
            </Text>
          </Fragment>
        ) : null
      )}
    </>
  );
};

const CurrentQuestion = ({ curQuestion }) => {
  if (!curQuestion) return null;

  return (
    <Text>
      {curQuestion.text}
      {curQuestion.postfix && (
        <Text color="violet.300" as="span">
          {curQuestion.postfix}
        </Text>
      )}
    </Text>
  );
};

const Summary = ({ questions, setQuestions }) => {
  const [complete, setComplete] = useState(false);

  const handleReset = () => {
    setQuestions((pv) => pv.map((q) => ({ ...q, value: "", complete: false })));
  };

  const handleSend = () => {
    const formData = questions.reduce((acc, val) => {
      return { ...acc, [val.key]: val.value };
    }, {});

    console.log(formData);
    setComplete(true);
  };

  return (
    <>
      <Text>{`Beautiful! Here's what we've got:`}</Text>
      {questions.map((q) => (
        <Text key={q.key}>
          <Text color="blue.300" as="span">
            {q.key}:
          </Text>{" "}
          {q.value}
        </Text>
      ))}
      <Text>Look good?</Text>
      {complete ? (
        <Text color="emerald.300">
          <FiCheckCircle className="inline-block mr-2" />
          {`Sent! We'll get back to you ASAP 😎`}
        </Text>
      ) : (
        <Flex gap={2} mt={2}>
          <Button onClick={handleReset} colorScheme="gray">
            Restart
          </Button>
          <Button onClick={handleSend} colorScheme="indigo">
            Send it!
          </Button>
        </Flex>
      )}
    </>
  );
};

const CurLine = ({
  text,
  focused,
  setText,
  setFocused,
  inputRef,
  command,
  handleSubmitLine,
  containerRef,
}) => {
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitLine(text);
    setText("");
    setTimeout(scrollToBottom, 0);
  };

  const onChange = (e) => {
    setText(e.target.value);
    scrollToBottom();
  };

  useEffect(() => {
    return () => setFocused(false);
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          onChange={onChange}
          value={text}
          type="text"
          variant="unstyled"
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        />
      </form>
      <Text>
        <Text as="span" color="emerald.400">
          ➜
        </Text>{" "}
        <Text as="span" color="cyan.300">
          ~
        </Text>{" "}
        {command && (
          <Text as="span" opacity={0.5}>
            Enter {command}:{" "}
          </Text>
        )}
        {text}
        {focused && (
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
              times: [0, 0.5, 0.5, 1],
            }}
            style={{
              display: "inline-block",
              width: "8px", // Equivalent to w-2 in Tailwind
              height: "20px", // Equivalent to h-5 in Tailwind
              backgroundColor: "#94a3b8", // Equivalent to bg-slate-400 in Tailwind
              transform: "translateY(4px)", // Equivalent to translate-y-1 in Tailwind
              marginLeft: "2px", // Equivalent to ml-0.5 in Tailwind
            }}
          />
        )}
      </Text>
    </>
  );
};

export default TerminalContact;

const QUESTIONS = [
  {
    key: "email",
    text: "To start, could you give us ",
    postfix: "your email?",
    complete: false,
    value: "",
  },
  {
    key: "name",
    text: "Awesome! And what's ",
    postfix: "your name?",
    complete: false,
    value: "",
  },
  {
    key: "description",
    text: "Perfect, and ",
    postfix: "how can we help you?",
    complete: false,
    value: "",
  },
];
