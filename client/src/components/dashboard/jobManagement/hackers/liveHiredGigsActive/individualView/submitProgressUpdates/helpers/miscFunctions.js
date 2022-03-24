import React, { Fragment } from "react";
import "./styles.css";
import { ListGroupItem, Row, Col, Badge, Button } from 'reactstrap';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import FileViewer from 'react-file-viewer';
import _ from "lodash";


const CustomInputHelper = (accept, onFiles, setCurrentFilePathData, setCurrentUploadFileStatus, setFileReadyStatus) => {

    const text = "Drop a file OR select to browse local data";

    return (
        <label className="custom-input-dropzone-copy" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
            {text}
            <input
                style={{ display: 'none' }}
                type="file"
                accept={accept}
                multiple={false}
                className={"custom-dropzone-input-actual-input"}
                onChange={e => {
                    const file = e.target.files[0];
                    // set current file path to convert to readable URL later
                    setCurrentFilePathData(URL.createObjectURL(file));
                    // set status update for current file
                    setCurrentUploadFileStatus(file);
                    // mark file as READY 
                    setFileReadyStatus(true);
                    // update "Dropzone" component state (NOT this react component state).
                    onFiles([file])
                }}
            />
        </label>
    );
}
const handleSubmit = (runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setFiles) => {

    console.log("submitted!", currentFileSelectedUpload, fileMetaData);

    const data = new FormData();

    data.append("file", currentFileSelectedUpload);
    data.append("meta", fileMetaData);

    const config = {
        onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            setProgress(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/upload/misc/file/softare/listing/sale`, data, config).then((res) => {
        if (res.data.message === "Successfully uploaded file!") {
            console.log(res.data);

            const { file } = res.data;

            // update current file in main component
            NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);

            setFiles(prevState => {
                return [...prevState, file]
            })

            setMetaFileData(null);
            setFileReadyStatus(false);
            setCurrentUploadFileStatus(null);

            runSubmit();
        } else {
            console.log("Err", res.data);
        }
    }).catch((err) => {
        console.log(err);
    })
};
const calculateFileType = (type) => {
    switch (type) {
        case "video/mp4":
            return "mp4";
            break;
        case "image/png":
            return "png";
            break;
        case "image/jpeg":
            return "jpeg";
            break;
        case "image/jpg":
            return "jpg";
            break;
        case "image/gif":
            return "gif";
            break;
        case "image/bmp":
            return "bmp";
            break;
        case "application/pdf":
            return "pdf";
            break;
        case "text/csv":
            return "csv";
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "xlsx";
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
            break;
        case "video/webm":
            return "webm";
            break;
        case "audio/mpeg":
            return "mp3";
            break;
        default:
            break;
    }
}
const renderCustomButtonDropzone = (data, e, currentFileSelectedUpload, setMetaFileData, setFileReadyStatus, fileMetaData, setProgress, setCurrentUploadFileStatus, fileReady, setFiles) => {

    const { meta } = data.files[0];

    console.log("meta", meta);

    if (currentFileSelectedUpload === null) {
        return null;
    } else {
        if (fileReady === true) {
            return (
                <Fragment>
                    <Button style={{ marginTop: "25px" }} onClick={(e) => {
                        e.preventDefault();
                        // file meta data for next action
                        setMetaFileData(meta);
                        // set file status as ready or prepared.
                        setFileReadyStatus(false);

                        const runSubmit = data.onSubmit;

                        handleSubmit(runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setFiles);
                    }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload New File!</Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Button style={{ marginTop: "25px" }} onClick={() => {
                        NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                    }} className="btn-air-light" color="light" size="md">Submit & Upload New File!</Button>
                </Fragment>
            );
        }
    }
}
const renderPreviewOfFile = (data, fileReady, filePathData) => {

    const file = data.fileWithMeta.file;
    // return preview data via FileViewer (to not exclude documents such as .docx and such...);
    if (fileReady === true) {
        return (
            <div className="filereader-preview-dropzone">
                <FileViewer
                    fileType={calculateFileType(file.type)}
                    filePath={filePathData}
                    onError={(err) => NotificationManager.warning(`Error 'loading' your recently selected 'preview' file - please select another file & try again...`, 'File loading error!', 4500)}
                    key={file.id}
                />
            </div>
        );
    } else {
        return null;
    }
}
const onSubmitHelper = (files, allFiles) => {
    allFiles.forEach((file) => {
        file.remove();
    })
}
const ItemRendererVul = ({ item, methods, selectedVul }) => {
    console.log("item", item);
    return (
        <Fragment key={item.id}>
            <ListGroupItem onClick={() => methods.addItem(item)} className={"list-group-item-action flex-column align-items-start"}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.name} ~ {item.external_id}</h5><small>{`Vulnerability ID ~ ${item.id}`}</small>
                </div>
                <p className="mb-1">{item.description}</p>
            </ListGroupItem>
        </Fragment>
    );
};
const ItemRenderer = ({ item, methods, selectedAsset }) => {
    console.log("item", item);

    return (
        <Fragment key={item.id}>
            <ListGroupItem onClick={() => methods.addItem(item)} className={selectedAsset.id !== null && selectedAsset.id === item.id ? "list-group-item-action flex-column align-items-start active" : "list-group-item-action flex-column align-items-start"}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.name}</h5><small>{`Asset ID ~ ${item.id}`}</small>
                </div>
                <p className="mb-1">{`This 'asset' has multiple reward tier's with 'low severity' paying the least generally and 'critical' paying the most, the employer and you will determine this vulerability risk/rating or class..`}</p>
                <Row>
                    <Col sm="6" lg="3" md="3" xl="3">
                        <Badge style={{ width: "100%" }} color="primary">${item.lowSeverity} Per <strong>LOW</strong> Severity</Badge>
                    </Col>
                    <Col sm="6" lg="3" md="3" xl="3">
                        <Badge style={{ width: "100%" }} color="secondary">${item.mediumSeverity} Per <strong>MEDIUM</strong> Severity</Badge>
                    </Col>
                    <Col sm="6" lg="3" md="3" xl="3">
                        <Badge style={{ width: "100%" }} color="info">${item.highSeverity} Per <strong>HIGH</strong> Severity</Badge>
                    </Col>
                    <Col sm="6" lg="3" md="3" xl="3">
                        <Badge style={{ width: "100%" }} color="success">${item.criticalSeverity} Per <strong>CRITICAL</strong> Severity</Badge>
                    </Col>
                </Row>
            </ListGroupItem>
        </Fragment>
    );
};

const weaknessOptions = [
    {
        "id": 12,
        "name": "Array Index Underflow",
        "description": "The product uses untrusted input when calculating or using an array index, but the product does not validate or incorrectly validates the index to ensure the index references a valid position within the array.",
        "external_id": "cwe-129",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 31,
        "name": "Brute Force",
        "description": "The software does not implement sufficient measures to prevent multiple failed authentication attempts within in a short time frame, making it more susceptible to brute force attacks.",
        "external_id": "cwe-307",
        "cluster_ids": [
            5,
            43,
            45,
            32,
            36,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 9,
        "name": "Buffer Over-read",
        "description": "The software reads from a buffer using buffer access mechanisms such as indexes or pointers that reference memory locations after the targeted buffer.",
        "external_id": "cwe-126",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 7,
        "name": "Buffer Underflow",
        "description": "The software writes to a buffer using an index or pointer that references a memory location prior to the beginning of the buffer.",
        "external_id": "cwe-124",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 10,
        "name": "Buffer Under-read",
        "description": "The software reads from a buffer using buffer access mechanisms such as indexes or pointers that reference memory locations prior to the targeted buffer.",
        "external_id": "cwe-127",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 65,
        "name": "Business Logic Errors",
        "description": "Weaknesses in this category identify some of the underlying problems that commonly allow attackers to manipulate the business logic of an application.",
        "external_id": "cwe-840",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 3,
        "name": "Classic Buffer Overflow",
        "description": "The program copies an input buffer to an output buffer without verifying that the size of the input buffer is less than the size of the output buffer, leading to a buffer overflow.",
        "external_id": "cwe-120",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 33,
        "name": "Cleartext Storage of Sensitive Information",
        "description": "The application stores sensitive information in cleartext within a resource that might be accessible to another control sphere.",
        "external_id": "cwe-312",
        "cluster_ids": [
            10,
            16,
            43,
            46,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 34,
        "name": "Cleartext Transmission of Sensitive Information",
        "description": "The software transmits sensitive or security-critical data in cleartext in a communication channel that can be sniffed by unauthorized actors.",
        "external_id": "cwe-319",
        "cluster_ids": [
            10,
            16,
            43,
            46,
            32,
            35,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 102,
        "name": "Client-Side Enforcement of Server-Side Security",
        "description": "The software is composed of a server that relies on the client to implement a mechanism that is intended to protect the server.",
        "external_id": "cwe-602",
        "cluster_ids": [
            32,
            40
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 70,
        "name": "Code Injection",
        "description": "The software constructs all or part of a code segment using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the syntax or behavior of the intended code segment.",
        "external_id": "cwe-94",
        "cluster_ids": [
            43,
            44,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 58,
        "name": "Command Injection - Generic",
        "description": "The software constructs all or part of a command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended command when it is sent to a downstream component.",
        "external_id": "cwe-77",
        "cluster_ids": [
            10,
            11,
            43,
            44,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 69,
        "name": "CRLF Injection",
        "description": "The software uses CRLF (carriage return line feeds) as a special element, e.g. to separate lines or records, but it does not neutralize or incorrectly neutralizes CRLF sequences from inputs.",
        "external_id": "cwe-93",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 45,
        "name": "Cross-Site Request Forgery (CSRF)",
        "description": "The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.",
        "external_id": "cwe-352",
        "cluster_ids": [
            10,
            18,
            32,
            33
        ],
        "state": "enabled",
        "context_type": "CsrfContext"
    },
    {
        "id": 63,
        "name": "Cross-site Scripting (XSS) - DOM",
        "description": "In DOM-based XSS, the client performs the injection of XSS into the page; in the other types, the server performs the injection. DOM-based XSS generally involves server-controlled, trusted script that is sent to the client, such as Javascript that performs sanity checks on a form before the user submits it. If the server-supplied script processes user-supplied data and then injects it back into the web page (such as with dynamic HTML), then DOM-based XSS is possible.",
        "external_id": "cwe-79",
        "cluster_ids": [
            10,
            13,
            43,
            50,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 60,
        "name": "Cross-site Scripting (XSS) - Generic",
        "description": "The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.",
        "external_id": "cwe-79",
        "cluster_ids": [
            10,
            13,
            43,
            50,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 61,
        "name": "Cross-site Scripting (XSS) - Reflected",
        "description": "The server reads data directly from the HTTP request and reflects it back in the HTTP response. Reflected XSS exploits occur when an attacker causes a victim to supply dangerous content to a vulnerable web application, which is then reflected back to the victim and executed by the web browser. The most common mechanism for delivering malicious content is to include it as a parameter in a URL that is posted publicly or e-mailed directly to the victim. URLs constructed in this manner constitute the core of many phishing schemes, whereby an attacker convinces a victim to visit a URL that refers to a vulnerable site. After the site reflects the attacker's content back to the victim, the content is executed by the victim's browser.",
        "external_id": "cwe-79",
        "cluster_ids": [
            10,
            13,
            43,
            50,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 62,
        "name": "Cross-site Scripting (XSS) - Stored",
        "description": "The application stores dangerous data in a database, message forum, visitor log, or other trusted data store. At a later time, the dangerous data is subsequently read back into the application and included in dynamic content. From an attacker's perspective, the optimal place to inject malicious content is in an area that is displayed to either many users or particularly interesting users. Interesting users typically have elevated privileges in the application or interact with sensitive data that is valuable to the attacker. If one of these users executes malicious content, the attacker may be able to perform privileged operations on behalf of the user or gain access to sensitive data belonging to the user. For example, the attacker might inject XSS into a log message, which might not be handled properly when an administrator views the logs.",
        "external_id": "cwe-79",
        "cluster_ids": [
            10,
            13,
            43,
            50,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": "XssStoredContext"
    },
    {
        "id": 32,
        "name": "Cryptographic Issues - Generic",
        "description": "Weaknesses in this category are related to the use of cryptography.",
        "external_id": "cwe-310",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 48,
        "name": "Denial of Service",
        "description": "The software does not properly restrict the size or amount of resources that are requested or influenced by an actor, which can be used to consume more resources than intended.",
        "external_id": "cwe-400",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 52,
        "name": "Deserialization of Untrusted Data",
        "description": "The application deserializes untrusted data without sufficiently verifying that the resulting data will be valid.",
        "external_id": "cwe-502",
        "cluster_ids": [
            43,
            51,
            8,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 49,
        "name": "Double Free",
        "description": "The product calls free() twice on the same memory address, potentially leading to modification of unexpected memory locations.",
        "external_id": "cwe-415",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 85,
        "name": "Forced Browsing",
        "description": "The web application does not adequately enforce appropriate authorization on all restricted URLs, scripts, or files.",
        "external_id": "cwe-425",
        "cluster_ids": [
            5,
            43,
            48,
            32,
            36,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 5,
        "name": "Heap Overflow",
        "description": "A heap overflow condition is a buffer overflow, where the buffer that can be overwritten is allocated in the heap portion of memory, generally meaning that the buffer was allocated using a routine such as malloc().",
        "external_id": "cwe-122",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 86,
        "name": "HTTP Request Smuggling",
        "description": "When malformed or abnormal HTTP requests are interpreted by one or more entities in the data flow between the user and the web server, such as a proxy or firewall, they can be interpreted inconsistently, allowing the attacker to \"smuggle\" a request to one device without the other device being aware of it.",
        "external_id": "cwe-444",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 1,
        "name": "HTTP Response Splitting",
        "description": "The software receives data from an upstream component, but does not neutralize or incorrectly neutralizes CR and LF characters before the data is included in outgoing HTTP headers.",
        "external_id": "cwe-113",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 26,
        "name": "Improper Access Control - Generic",
        "description": "The software does not restrict or incorrectly restricts access to a resource from an unauthorized actor.",
        "external_id": "cwe-284",
        "cluster_ids": [
            5,
            10,
            17,
            43,
            48,
            32,
            36,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 27,
        "name": "Improper Authentication - Generic",
        "description": "When an actor claims to have a given identity, the software does not prove or insufficiently proves that the claim is correct.",
        "external_id": "cwe-287",
        "cluster_ids": [
            5,
            10,
            12,
            17,
            43,
            45,
            48,
            32,
            33,
            36,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 28,
        "name": "Improper Certificate Validation",
        "description": "The software does not validate, or incorrectly validates, a certificate.",
        "external_id": "cwe-295",
        "cluster_ids": [
            6,
            43,
            46,
            32,
            35,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 29,
        "name": "Improper Following of a Certificate's Chain of Trust",
        "description": "The software does not follow, or incorrectly follows, the chain of trust for a certificate back to a trusted root certificate, resulting in incorrect trust of any resource that is associated with that certificate.",
        "external_id": "cwe-296",
        "cluster_ids": [
            6,
            32,
            35,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 93,
        "name": "Improper Neutralization of HTTP Headers for Scripting Syntax",
        "description": "The application does not neutralize or incorrectly neutralizes web scripting syntax in HTTP headers that can be used by web browser components that can process raw headers, such as Flash.",
        "external_id": "cwe-644",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 14,
        "name": "Improper Null Termination",
        "description": "The software does not terminate or incorrectly terminates a string or array with a null character or equivalent terminator.",
        "external_id": "cwe-170",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 40,
        "name": "Inadequate Encryption Strength",
        "description": "The software stores or transmits sensitive data using an encryption scheme that is theoretically sound, but is not strong enough for the level of protection required.",
        "external_id": "cwe-326",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 13,
        "name": "Incorrect Calculation of Buffer Size",
        "description": "The software does not correctly calculate the size to be used when allocating a buffer, which could lead to a buffer overflow.",
        "external_id": "cwe-131",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 18,
        "name": "Information Disclosure",
        "description": "An information disclosure is the intentional or unintentional disclosure of information to an actor that is not explicitly authorized to have access to that information.",
        "external_id": "cwe-200",
        "cluster_ids": [
            5,
            32,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 82,
        "name": "Information Exposure Through an Error Message",
        "description": "The software generates an error message that includes sensitive information about its environment, users, or associated data.",
        "external_id": "cwe-209",
        "cluster_ids": [
            5,
            10,
            15,
            43,
            49,
            32,
            33,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 83,
        "name": "Information Exposure Through Debug Information",
        "description": "The application contains debugging code that can expose sensitive information to untrusted parties.",
        "external_id": "cwe-215",
        "cluster_ids": [
            5,
            10,
            15,
            32,
            33,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 89,
        "name": "Information Exposure Through Directory Listing",
        "description": "A directory listing is inappropriately exposed, yielding potentially sensitive information to attackers.",
        "external_id": "cwe-548",
        "cluster_ids": [
            5,
            10,
            15,
            43,
            49,
            32,
            33,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 55,
        "name": "Insecure Direct Object Reference (IDOR)",
        "description": "The system's authorization functionality does not prevent one user from gaining access to another user's data or record by modifying the key value identifying the data.",
        "external_id": "cwe-639",
        "cluster_ids": [
            5,
            10,
            14,
            43,
            48,
            32,
            33,
            36,
            38,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 101,
        "name": "Insecure Storage of Sensitive Information",
        "description": "The software stores sensitive information without properly limiting read or write access by unauthorized actors.",
        "external_id": "cwe-922",
        "cluster_ids": [
            10,
            16,
            43,
            46,
            32,
            34,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 87,
        "name": "Insufficiently Protected Credentials",
        "description": "This weakness occurs when the application transmits or stores authentication credentials and uses an insecure method that is susceptible to unauthorized interception and/or retrieval.",
        "external_id": "cwe-522",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 90,
        "name": "Insufficient Session Expiration",
        "description": "According to WASC, \"Insufficient Session Expiration is when a web site permits an attacker to reuse old session credentials or session IDs for authorization.\"",
        "external_id": "cwe-613",
        "cluster_ids": [
            5,
            10,
            12,
            43,
            45,
            32,
            33,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 15,
        "name": "Integer Overflow",
        "description": "The software performs a calculation that can produce an integer overflow or wraparound, when the logic assumes that the resulting value will always be larger than the original value. This can introduce other weaknesses when the calculation is used for resource management or execution control.",
        "external_id": "cwe-190",
        "cluster_ids": [
            7,
            43,
            52
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 16,
        "name": "Integer Underflow",
        "description": "The product subtracts one value from another, such that the result is less than the minimum allowable integer value, which produces a value that is not equal to the correct result.",
        "external_id": "cwe-191",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 36,
        "name": "Key Exchange without Entity Authentication",
        "description": "The software performs a key exchange with an actor without verifying the identity of that actor.",
        "external_id": "cwe-322",
        "cluster_ids": [
            5,
            6,
            32,
            36,
            37,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 99,
        "name": "LDAP Injection",
        "description": "The software constructs all or part of an LDAP query using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended LDAP query when it is sent to a downstream component.",
        "external_id": "cwe-90",
        "cluster_ids": [
            10,
            11,
            43,
            44,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 103,
        "name": "Leftover Debug Code (Backdoor)",
        "description": "The application was deployed with active debugging code that can create unintended entry points.",
        "external_id": "cwe-489",
        "cluster_ids": [
            32,
            42
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 76,
        "name": "Malware",
        "description": "An adversary installs and executes malicious code on the target system in an effort to achieve a negative technical impact.",
        "external_id": "capec-549",
        "cluster_ids": [],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 30,
        "name": "Man-in-the-Middle",
        "description": "The product does not adequately verify the identity of actors at both ends of a communication channel, or does not adequately ensure the integrity of the channel, in a way that allows the channel to be accessed or influenced by an actor that is not an endpoint.",
        "external_id": "cwe-300",
        "cluster_ids": [
            32,
            35,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 2,
        "name": "Memory Corruption - Generic",
        "description": "The software performs operations on a memory buffer, but it can read from or write to a memory location that is outside of the intended boundary of the buffer.",
        "external_id": "cwe-119",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 84,
        "name": "Missing Encryption of Sensitive Data",
        "description": "The software does not encrypt sensitive or critical information before storage or transmission.",
        "external_id": "cwe-311",
        "cluster_ids": [
            10,
            12,
            16,
            43,
            46,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 39,
        "name": "Missing Required Cryptographic Step",
        "description": "The software does not implement a required step in a cryptographic algorithm, resulting in weaker encryption than advertised by that algorithm.",
        "external_id": "cwe-325",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 51,
        "name": "NULL Pointer Dereference",
        "description": "A NULL pointer dereference occurs when the application dereferences a pointer that it expects to be valid, but is NULL, typically causing a crash or exit.",
        "external_id": "cwe-476",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 17,
        "name": "Off-by-one Error",
        "description": "A product calculates or uses an incorrect maximum or minimum value that is 1 more, or 1 less, than the correct value.",
        "external_id": "cwe-193",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 53,
        "name": "Open Redirect",
        "description": "A web application accepts a user-controlled input that specifies a link to an external site, and uses that link in a Redirect. This simplifies phishing attacks.",
        "external_id": "cwe-601",
        "cluster_ids": [
            10,
            20,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 59,
        "name": "OS Command Injection",
        "description": "The software constructs all or part of an OS command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended OS command when it is sent to a downstream component.",
        "external_id": "cwe-78",
        "cluster_ids": [
            10,
            11,
            43,
            44,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 8,
        "name": "Out-of-bounds Read",
        "description": "The software reads data past the end, or before the beginning, of the intended buffer.",
        "external_id": "cwe-125",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 24,
        "name": "Password in Configuration File",
        "description": "The software stores a password in a configuration file that might be accessible to actors who do not know the password.",
        "external_id": "cwe-260",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 19,
        "name": "Path Traversal",
        "description": "The software uses external input to construct a pathname that is intended to identify a file or directory that is located underneath a restricted parent directory, but the software does not properly neutralize special elements within the pathname that can cause the pathname to resolve to a location that is outside of the restricted directory.",
        "external_id": "cwe-22",
        "cluster_ids": [
            5,
            10,
            14,
            43,
            48,
            32,
            33,
            36,
            38,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 73,
        "name": "Phishing",
        "description": "Phishing is a social engineering technique where an attacker masquerades as a legitimate entity with which the victim might do business in order to prompt the user to reveal some confidential information (very frequently authentication credentials) that can later be used by an attacker. Phishing is essentially a form of information gathering or \"fishing\" for information.",
        "external_id": "capec-98",
        "cluster_ids": [],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 21,
        "name": "Plaintext Storage of a Password",
        "description": "Storing a password in plaintext may result in a system compromise.",
        "external_id": "cwe-256",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 46,
        "name": "Privacy Violation",
        "description": "The software does not properly prevent private data (such as credit card numbers) from being accessed by actors who either (1) are not explicitly authorized to access the data or (2) do not have the implicit consent of the people to which the data is related.",
        "external_id": "cwe-359",
        "cluster_ids": [
            5,
            43,
            46,
            32,
            36,
            38,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 75,
        "name": "Privilege Escalation",
        "description": "An adversary exploits a weakness enabling them to elevate their privilege and perform an action that they are not supposed to be authorized to perform.",
        "external_id": "capec-233",
        "cluster_ids": [
            5,
            43,
            48,
            32,
            36,
            38
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 97,
        "name": "Reliance on Cookies without Validation and Integrity Checking in a Security Decision",
        "description": "The application uses a protection mechanism that relies on the existence or values of a cookie, but it does not properly ensure that the cookie is valid for the associated user.",
        "external_id": "cwe-784",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 71,
        "name": "Remote File Inclusion",
        "description": "The PHP application receives input from an upstream component, but it does not restrict or incorrectly restricts the input before its usage in \"require,\" \"include,\" or similar functions.",
        "external_id": "cwe-98",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 72,
        "name": "Resource Injection",
        "description": "The software receives input from an upstream component, but it does not restrict or incorrectly restricts the input before it is used as an identifier for a resource that may be outside the intended sphere of control.",
        "external_id": "cwe-99",
        "cluster_ids": [
            10,
            14,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 37,
        "name": "Reusing a Nonce, Key Pair in Encryption",
        "description": "Nonces should be used for the present occasion and only once.",
        "external_id": "cwe-323",
        "cluster_ids": [
            6,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 42,
        "name": "Reversible One-Way Hash",
        "description": "The product uses a hashing algorithm that produces a hash value that can be used to determine the original input, or to find an input that can produce the same hash, more efficiently than brute force techniques.",
        "external_id": "cwe-328",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 56,
        "name": "Security Through Obscurity",
        "description": "The software uses a protection mechanism whose strength depends heavily on its obscurity, such that knowledge of its algorithms or key data is sufficient to defeat the mechanism.",
        "external_id": "cwe-656",
        "cluster_ids": [
            32,
            41
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 68,
        "name": "Server-Side Request Forgery (SSRF)",
        "description": "The web server receives a URL or similar request from an upstream component and retrieves the contents of this URL, but it does not sufficiently ensure that the request is being sent to the expected destination.",
        "external_id": "cwe-918",
        "cluster_ids": [
            9
        ],
        "state": "enabled",
        "context_type": "SsrfContext"
    },
    {
        "id": 47,
        "name": "Session Fixation",
        "description": "Authenticating a user, or otherwise establishing a new user session, without invalidating any existing session identifier gives an attacker the opportunity to steal authenticated sessions.",
        "external_id": "cwe-384",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 67,
        "name": "SQL Injection",
        "description": "The software constructs all or part of an SQL command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended SQL command when it is sent to a downstream component.",
        "external_id": "cwe-89",
        "cluster_ids": [
            10,
            11,
            43,
            44,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": "SqlInjectionContext"
    },
    {
        "id": 4,
        "name": "Stack Overflow",
        "description": "A stack-based buffer overflow condition is a condition where the buffer being overwritten is allocated on the stack (i.e., is a local variable or, rarely, a parameter to a function).",
        "external_id": "cwe-121",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 22,
        "name": "Storing Passwords in a Recoverable Format",
        "description": "The storage of passwords in a recoverable format makes them subject to password reuse attacks by malicious users. In fact, it should be noted that recoverable encrypted passwords provide no significant benefit over plaintext passwords since they are subject not only to reuse by malicious attackers but also by malicious insiders. If a system administrator can recover a password directly, or use a brute force search on the available information, the administrator can use the password on other accounts.",
        "external_id": "cwe-257",
        "cluster_ids": [
            6,
            32,
            37,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 66,
        "name": "Type Confusion",
        "description": "The program allocates or initializes a resource such as a pointer, object, or variable using one type, but it later accesses that resource using a type that is incompatible with the original type.",
        "external_id": "cwe-843",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 74,
        "name": "UI Redressing (Clickjacking)",
        "description": "In a clickjacking attack the victim is tricked into unknowingly initiating some action in one system while interacting with the UI from seemingly completely different system.",
        "external_id": "capec-103",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": "ClickJackingContext"
    },
    {
        "id": 88,
        "name": "Unprotected Transport of Credentials",
        "description": "Login pages not using adequate measures to protect the user name and password while they are in transit from the client to the server.",
        "external_id": "cwe-523",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33,
            35,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 91,
        "name": "Unverified Password Change",
        "description": "When setting a new password for a user, the product does not require knowledge of the original password, or using another form of authentication.",
        "external_id": "cwe-620",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 50,
        "name": "Use After Free",
        "description": "Referencing memory after it has been freed can cause a program to crash, use unexpected values, or execute code.",
        "external_id": "cwe-416",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 41,
        "name": "Use of a Broken or Risky Cryptographic Algorithm",
        "description": "The use of a broken or risky cryptographic algorithm is an unnecessary risk that may result in the exposure of sensitive information.",
        "external_id": "cwe-327",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            52,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 38,
        "name": "Use of a Key Past its Expiration Date",
        "description": "The product uses a cryptographic key or password past its expiration date, which diminishes its safety significantly by increasing the timing window for cracking attacks against that key.",
        "external_id": "cwe-324",
        "cluster_ids": [
            6,
            10,
            16,
            43,
            46,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 44,
        "name": "Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG)",
        "description": "The product uses a Pseudo-Random Number Generator (PRNG) in a security context, but the PRNG is not cryptographically strong.",
        "external_id": "cwe-338",
        "cluster_ids": [
            6,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 81,
        "name": "Use of Externally-Controlled Format String",
        "description": "The software uses a function that accepts a format string as an argument, but the format string originates from an external source.",
        "external_id": "cwe-134",
        "cluster_ids": [
            7,
            43,
            51
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 64,
        "name": "Use of Hard-coded Credentials",
        "description": "The software contains hard-coded credentials, such as a password or cryptographic key, which it uses for its own inbound authentication, outbound communication to external components, or encryption of internal data.",
        "external_id": "cwe-798",
        "cluster_ids": [
            43,
            45,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 35,
        "name": "Use of Hard-coded Cryptographic Key",
        "description": "The use of a hard-coded cryptographic key significantly increases the possibility that encrypted data may be recovered.",
        "external_id": "cwe-321",
        "cluster_ids": [
            6,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 23,
        "name": "Use of Hard-coded Password",
        "description": "The software contains a hard-coded password, which it uses for its own inbound authentication or for outbound communication to external components.",
        "external_id": "cwe-259",
        "cluster_ids": [
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 20,
        "name": "Use of Inherently Dangerous Function",
        "description": "The program calls a function that can never be guaranteed to work safely.",
        "external_id": "cwe-242",
        "cluster_ids": [
            32,
            39
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 43,
        "name": "Use of Insufficiently Random Values",
        "description": "The software may use insufficiently random numbers or values in a security context that depends on unpredictable numbers.",
        "external_id": "cwe-330",
        "cluster_ids": [
            6,
            32,
            37
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 57,
        "name": "Violation of Secure Design Principles",
        "description": "The product violates well-established principles for secure design.",
        "external_id": "cwe-657",
        "cluster_ids": [
            10,
            19,
            43,
            52,
            32,
            39,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 25,
        "name": "Weak Cryptography for Passwords",
        "description": "Obscuring a password with a trivial encoding does not protect the password.",
        "external_id": "cwe-261",
        "cluster_ids": [
            6,
            32,
            37,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 92,
        "name": "Weak Password Recovery Mechanism for Forgotten Password",
        "description": "The software contains a mechanism for users to recover or change their passwords without knowing the original password, but the mechanism is weak.",
        "external_id": "cwe-640",
        "cluster_ids": [
            10,
            12,
            43,
            45,
            32,
            33,
            8
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 11,
        "name": "Wrap-around Error",
        "description": "Wrap around errors occur whenever a value is incremented past the maximum value for its type and therefore \"wraps around\" to a very small, negative, or undefined value.",
        "external_id": "cwe-128",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 6,
        "name": "Write-what-where Condition",
        "description": "Any condition where the attacker has the ability to write an arbitrary value to an arbitrary location, often as the result of a buffer overflow.",
        "external_id": "cwe-123",
        "cluster_ids": [
            7
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 96,
        "name": "XML Entity Expansion",
        "description": "The software uses XML documents and allows their structure to be defined with a Document Type Definition (DTD), but it does not properly control the number of recursive definitions of entities.",
        "external_id": "cwe-776",
        "cluster_ids": [
            43,
            47,
            8,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 54,
        "name": "XML External Entities (XXE)",
        "description": "The software processes an XML document that can contain XML entities with URIs that resolve to documents outside of the intended sphere of control, causing the product to embed incorrect documents into its output.",
        "external_id": "cwe-611",
        "cluster_ids": [
            43,
            47,
            9
        ],
        "state": "enabled",
        "context_type": null
    },
    {
        "id": 100,
        "name": "XML Injection",
        "description": "The software does not properly neutralize special elements that are used in XML, allowing attackers to modify the syntax, content, or commands of the XML before it is processed by an end system.",
        "external_id": "cwe-91",
        "cluster_ids": [
            10,
            11,
            43,
            44,
            32,
            33,
            9
        ],
        "state": "enabled",
        "context_type": null
    }
];

export default {
    ItemRenderer,
    ItemRendererVul,
    weaknessOptions,
    onSubmitHelper, 
    renderPreviewOfFile, 
    renderCustomButtonDropzone, 
    calculateFileType, 
    handleSubmit, 
    CustomInputHelper
};
  