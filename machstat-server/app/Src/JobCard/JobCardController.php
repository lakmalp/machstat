<?php

namespace App\Src\JobCard;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Src\JobCardType\JobCardType;
use App\Src\Node\Node;
use App\Src\Site\Site;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class JobCardController extends Controller
{
    private $validator;

    private $repository;
    function __construct(JobCardValidator $validator, JobCardRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = JobCard::get()->count();

        $data = JobCard::orderBy('created_at', 'ASC')
            ->with(['site', 'ownerUser', 'authorizerUser'])
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'sites' => Site::get(), 
            'ownerUsers' => User::get(),
            'authorizerUsers' => User::get(),
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        $jobCard = new JobCard;
        return response()->json([
            'sites' => Site::get(), 
            'ownerUsers' => User::get(), 
            'authorizerUsers' => User::get(), 
            'data' => $jobCard
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-jobCard', JobCard::class), 403);

        $validated = $this->validator->validateCreate($request);

        $jobCard = $this->repository->createJobCard($validated);
        $jobCard->load(['site', 'ownerUser', 'authorizerUser']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $jobCard]);
    }

    public function edit(JobCard $jobCard): JsonResponse
    {
        return response()->json([
            'sites' => Site::get(), 
            'ownerUsers' => User::get(), 
            'authorizerUsers' => User::get(), 
            'data' => $jobCard
        ]);
    }

    public function update(Request $request, JobCard $jobCard): JsonResponse
    {
        abort_if($request->user()->cannot('edit-jobCard', JobCard::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $jobCard = $this->repository->updateJobCard($jobCard, $validated);
        $jobCard->load(['site', 'ownerUser', 'authorizerUser']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $jobCard]);
    }

    public function delete(JobCard $jobCard): bool
    {
        return $jobCard->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        JobCard::destroy($request->all());
        return response()->json([]);
    }
}
