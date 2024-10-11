"use client"
import { GoogleGenerativeAI } from "@google/generative-ai"
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Accordion, AccordionItem, Dropdown, DropdownTrigger, DropdownMenu, Select, SelectItem, Chip, Textarea, Card, CardBody, Divider, DropdownItem, Checkbox, Button, Avatar, Tabs, Tab, Input } from '@nextui-org/react'
import { ThemeSwitch } from '@/components/theme-switch'
import { useRouter } from 'next/navigation'
import Code from '@/components/Code'

async function getProblemInfo(url: string) {
        const response = await fetch(url)
        const data = await response.json()
        return data
}


function Dashboard() {
        const genAI = new GoogleGenerativeAI("AIzaSyAPzGc5FkXZRaqoXDRRsFMp4f9qZ8gVKvg");
        const { data: session } = useSession();

        const code = `print("Hello World")`;

        const [problemUrl, setProblemUrl] = React.useState("");

        const [solution, setSolution] = React.useState("");
        const [problemStatement, setProblemStatement] = React.useState("");
        const [lang, setLang] = React.useState(new Set([]));

        const router = useRouter();

        async function getResult(prompt: string, language: string) {
                const model = genAI.getGenerativeModel({
                        model: "gemini-1.5-flash",
                        systemInstruction:
                                "You are a coding tutor. You are helping a student solve a coding problem. " +
                                "The student is stuck and needs help to solve the problem. Instead of providing the code, " +
                                "give the student hints to solve the problem, give 3 hints along with code blocks in the form of a JSON array, " +
                                "each hint should be a string. The student will use these hints to solve the problem." +
                                "let the array be of the form [{hint: '...', code: '...'}]. Also, include a 4th object that contains the entire solution The code should be in " + language + ". Do not add ```json, simply provide raw json,",
                });

                // old system prompt (for only hints)
                //"You are a coding tutor. You are helping a student solve a coding problem. " +
                //"The student is stuck and needs help to solve the problem. Instead of providing the code, " +
                //"give the student hints to solve the problem, give 3 hints in the form of a JSON array, " +
                //"each hint should be a string. The student will use these hints to solve the problem." +
                //"Do not add ```json, simply provide raw json"

                const result = await model.generateContent(prompt);

                const rawResponse = await result.response.text();
                console.log(JSON.parse(JSON.stringify(rawResponse)));

                //setSolution((rawResponse));
                setSolution(JSON.parse(JSON.stringify(rawResponse)));
                console.log(JSON.parse(solution)[3])
        }

        const [isCustomQuestion, setIsCustomQuestion] = React.useState(false);

        //React.useEffect(() => {
        //        if (session == null) {
        //                router.push("/");
        //        }
        //}, [])

        return (
                <>
                        <div className='navbar w-full  flex items-center justify-between'>
                                <h3 className="brand text-xl font-bold">CPTutor</h3>
                                <div className="flex gap-5 items-center">
                                        <ThemeSwitch />
                                        <Dropdown>
                                                <DropdownTrigger>
                                                        <Avatar color="success" src={session?.user?.image} isBordered />
                                                </DropdownTrigger>
                                                <DropdownMenu disabledKeys={["name"]} aria-label="Static Actions">
                                                        <DropdownItem key="name">{session?.user?.name}</DropdownItem>
                                                        <DropdownItem onClick={() => { signOut(); router.push("/") }} key="delete" className="text-danger" color="danger">
                                                                Log Out
                                                        </DropdownItem>
                                                </DropdownMenu>
                                        </Dropdown>
                                </div>
                        </div>
                        <h3 className='text-3xl mt-10 font-bold'>Dashboard</h3>

                        <div className="tabs w-full">
                                <div className="flex w-full flex-col">
                                        <Tabs
                                                aria-label="Options"
                                                color="primary"
                                                variant="underlined"
                                                disabledKeys={["recommended"]}
                                                classNames={{
                                                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                                        cursor: "w-full ",
                                                        tab: "max-w-fit px-0 h-12",
                                                        tabContent: "group-data-[selected=true]:text-primary"
                                                }}
                                        >
                                                <Tab
                                                        key="recommended"
                                                        title={
                                                                <div className="flex items-center space-x-2">
                                                                        <span>Recommended Problems</span>
                                                                </div>
                                                        }
                                                >Coming Soon</Tab>
                                                <Tab
                                                        key="problem-ai"
                                                        title={
                                                                <div className="flex items-center space-x-2">
                                                                        <span>Problem Assistant</span>
                                                                </div>
                                                        }
                                                >
                                                        <div className='my-2 mb-4'>
                                                                <Checkbox isSelected={isCustomQuestion} onValueChange={setIsCustomQuestion}>Custom Question</Checkbox>
                                                        </div>
                                                        {!isCustomQuestion && (<>
                                                                <div className='flex w-full gap-40'>
                                                                        <div className="flex flex-col w-1/2">
                                                                                <Input onValueChange={setProblemUrl} label="Problem URL" radius="sm" />

                                                                                <div className="flex w-full my-4 items-center gap-4">
                                                                                        <Select label="Language" radius='sm' onChange={setLang}>
                                                                                                <SelectItem key="python">Python</SelectItem>
                                                                                                <SelectItem key="c++">C++</SelectItem>
                                                                                                <SelectItem key="java">Java</SelectItem>
                                                                                        </Select>
                                                                                        <Button radius='sm' variant='solid' color='primary' className="font-bold" size='lg' onClick={() => console.log(getProblemInfo(problemUrl))}>Help</Button>
                                                                                </div>

                                                                                <Divider />
                                                                                <div className="mt-3 flex flex-col gap-2">
                                                                                        <Checkbox isDisabled>Include Code</Checkbox>
                                                                                        <Checkbox isDisabled>Include Hints</Checkbox>
                                                                                </div>
                                                                        </div>

                                                                        <div className="solution w-full">
                                                                                <Card>
                                                                                        <CardBody className="p-5">
                                                                                                <h3 className="font-bold text-2xl">Solution</h3>
                                                                                                <p><ReactMarkdown># Hello</ReactMarkdown></p>
                                                                                        </CardBody>
                                                                                </Card>
                                                                        </div>
                                                                </div>


                                                        </>)}

                                                        {isCustomQuestion && (<>
                                                                <div className='flex w-full gap-40'>
                                                                        <div className="flex flex-col w-1/2">
                                                                                <Textarea
                                                                                        label="Problem Description"
                                                                                        rows={30}
                                                                                        onValueChange={setProblemStatement}
                                                                                        size='lg'
                                                                                        className='w-full pt-2'
                                                                                        radius='sm'
                                                                                />

                                                                                <div className="flex w-full my-4 items-center gap-4">
                                                                                        <Select label="Language" radius='sm'>
                                                                                                <SelectItem key="python">Python</SelectItem>
                                                                                                <SelectItem key="c++">C++</SelectItem>
                                                                                                <SelectItem key="java">Java</SelectItem>
                                                                                        </Select>
                                                                                        <Button radius='sm' variant='solid' className="font-bold" color='primary' size='lg' onClick={() => getResult(problemStatement, "c++")}>Help</Button>
                                                                                </div>

                                                                                <Divider />
                                                                                <div className="mt-3 flex flex-col gap-2">
                                                                                        <Checkbox isDisabled>Include Code</Checkbox>
                                                                                        <Checkbox isDisabled>Include Hints</Checkbox>
                                                                                </div>
                                                                        </div>

                                                                        <div className="solution w-2/3">
                                                                                <Card className="shadow-none border border-2 border-base-900 bg-zinc-100/10 dark:border-zinc-900 dark:bg-zinc-900">
                                                                                        {solution && (
                                                                                                (<CardBody className="p-5">
                                                                                                        <Chip color="primary" variant="flat" radius="sm">Language: C++</Chip>
                                                                                                        <h3 className="font-bold p-3 text-xl">Hints</h3>
                                                                                                        {solution && (
                                                                                                                <Accordion variant="bordered" selectionMode="multiple">
                                                                                                                        <AccordionItem key="1" title="Hint 1">
                                                                                                                                <h3>{JSON.parse(solution)[0].hint}</h3>
                                                                                                                                <Code code={JSON.parse(solution)[0].code} language="cpp" />
                                                                                                                        </AccordionItem>
                                                                                                                        <AccordionItem key="2" title="Hint 2">
                                                                                                                                <h3>{JSON.parse(solution)[1].hint}</h3>
                                                                                                                                <Code code={JSON.parse(solution)[1].code} language="cpp" />
                                                                                                                        </AccordionItem>
                                                                                                                        <AccordionItem key="3" title="Hint 3">
                                                                                                                                <h3>{JSON.parse(solution)[2].hint}</h3>
                                                                                                                                <Code code={JSON.parse(solution)[2].code} language="cpp" />
                                                                                                                        </AccordionItem>
                                                                                                                </Accordion>

                                                                                                        )}
                                                                                                        <div className="flex flex-col mt-10">
                                                                                                                {solution &&
                                                                                                                        (
                                                                                                                                <Accordion variant="bordered">
                                                                                                                                        <AccordionItem title="Solution"><Code code={JSON.parse(solution)[3].code} language="cpp" /></AccordionItem>
                                                                                                                                </Accordion>
                                                                                                                        )}
                                                                                                        </div>
                                                                                                </CardBody>)
                                                                                        )}
                                                                                </Card>
                                                                        </div>
                                                                </div>
                                                        </>)}
                                                </Tab>
                                        </Tabs>
                                </div>
                        </div >
                        <p>
                        </p>
                </>



        )
}

export default Dashboard
